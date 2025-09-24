import { emailService } from './emailService.js';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const QUEUE_FILE = path.join(process.cwd(), 'email_queue.json');

class EmailQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.processingInterval = null;
    this.init();
  }

  async init() {
    await this.loadQueue();
    this.startProcessing();
    console.log(`Email queue initialized with ${this.queue.length} pending emails`);
  }

  async loadQueue() {
    try {
      if (existsSync(QUEUE_FILE)) {
        const data = await readFile(QUEUE_FILE, 'utf8');
        const parsedData = JSON.parse(data);
        
        // Filter out old failed emails (older than 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        this.queue = parsedData.filter(email => new Date(email.addedAt) > sevenDaysAgo);
        
        if (this.queue.length !== parsedData.length) {
          console.log(`Cleaned up ${parsedData.length - this.queue.length} old emails from queue`);
          await this.saveQueue();
        }
        
        console.log(`Loaded ${this.queue.length} emails from queue`);
      }
    } catch (error) {
      console.error('Error loading email queue:', error);
      // If file is corrupted, start with empty queue
      this.queue = [];
      await this.saveQueue();
    }
  }

  async saveQueue() {
    try {
      await writeFile(QUEUE_FILE, JSON.stringify(this.queue, null, 2));
    } catch (error) {
      console.error('Error saving email queue:', error);
    }
  }

  async addToQueue(emailData) {
    const queueItem = {
      ...emailData,
      id: Date.now() + Math.random().toString(36).substr(2, 9), // Unique ID
      addedAt: new Date().toISOString(),
      attempts: 0,
      lastAttempt: null,
      status: 'pending'
    };
    
    this.queue.push(queueItem);
    await this.saveQueue();
    
    console.log(`📧 Added email to queue: ${emailData.subject} -> ${emailData.to}`);
    
    // Auto-process if not already processing
    if (!this.isProcessing) {
      this.processQueue();
    }
    
    return queueItem.id;
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    try {
      while (this.queue.length > 0) {
        const emailData = this.queue[0];
        
        // Skip emails that have too many attempts
        if (emailData.attempts >= 5) {
          console.log(`Skipping email ${emailData.id} (too many attempts)`);
          this.queue.shift();
          await this.saveQueue();
          continue;
        }

        try {
          emailData.attempts = (emailData.attempts || 0) + 1;
          emailData.lastAttempt = new Date().toISOString();
          emailData.status = 'processing';
          
          await emailService.sendEmail(
            emailData.to,
            emailData.subject,
            emailData.html
          );
          
          // Success - remove from queue
          console.log(`✅ Email sent successfully: ${emailData.subject}`);
          this.queue.shift();
          await this.saveQueue();
          
        } catch (error) {
          console.error(`❌ Failed to send email (attempt ${emailData.attempts}):`, error.message);
          
          emailData.status = 'failed';
          emailData.lastError = error.message;
          
          if (emailData.attempts >= 5) {
            // Permanent failure
            console.error(`💀 Giving up on email ${emailData.id} after 5 attempts`);
            this.queue.shift();
          } else {
            // Temporary failure - move to end of queue
            emailData.nextRetry = new Date(Date.now() + (emailData.attempts * 5 * 60 * 1000)).toISOString(); // Exponential backoff
            this.queue.push(this.queue.shift());
          }
          
          await this.saveQueue();
          break; // Pause processing on error
        }
        
        // Rate limiting - be gentle with Gmail API
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } catch (error) {
      console.error('Unexpected error in processQueue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  startProcessing() {
    // Stop any existing interval
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    
    // Process queue every 30 seconds
    this.processingInterval = setInterval(() => {
      this.processQueue();
    }, 30000);
  }

  stopProcessing() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }

  getQueueStatus() {
    const now = new Date();
    const pending = this.queue.filter(email => 
      email.attempts < 5 && 
      (!email.nextRetry || new Date(email.nextRetry) <= now)
    ).length;
    
    const failed = this.queue.filter(email => email.attempts >= 5).length;
    const waitingRetry = this.queue.filter(email => 
      email.attempts < 5 && 
      email.nextRetry && 
      new Date(email.nextRetry) > now
    ).length;

    return {
      total: this.queue.length,
      pending,
      failed,
      waitingRetry,
      processing: this.isProcessing
    };
  }

  // Method to manually retry failed emails
  async retryFailedEmails() {
    const now = new Date();
    let retried = 0;
    
    for (const email of this.queue) {
      if (email.attempts < 5 && email.nextRetry && new Date(email.nextRetry) <= now) {
        email.nextRetry = null;
        email.status = 'pending';
        retried++;
      }
    }
    
    if (retried > 0) {
      await this.saveQueue();
      console.log(`🔁 Retried ${retried} emails`);
      this.processQueue();
    }
    
    return retried;
  }

  // Method to clear old emails
  async cleanupOldEmails(days = 7) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const initialLength = this.queue.length;
    
    this.queue = this.queue.filter(email => new Date(email.addedAt) > cutoff);
    
    if (this.queue.length < initialLength) {
      await this.saveQueue();
      console.log(`🧹 Cleaned up ${initialLength - this.queue.length} old emails`);
    }
    
    return initialLength - this.queue.length;
  }
}

export const emailQueue = new EmailQueue();

// Cleanup old emails every hour
setInterval(() => {
  emailQueue.cleanupOldEmails(7); // Keep emails for 7 days
}, 60 * 60 * 1000);

// Retry waiting emails every 5 minutes
setInterval(() => {
  emailQueue.retryFailedEmails();
}, 5 * 60 * 1000);