import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Search,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  PauseCircle,
  Eye,
  Download,
  BarChart3
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  mobile: string;
  status: string;
  created_at: string;
  last_login?: string;
  approved_by_name?: string;
  approved_at?: string;
}

interface ApprovalHistory {
  action: string;
  reason: string;
  created_at: string;
  admin_name: string;
  admin_email: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userHistory, setUserHistory] = useState<ApprovalHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, [activeTab, pagination.page]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.getUsers({
        status: activeTab === 'all' ? undefined : activeTab,
        page: pagination.page,
        limit: pagination.limit
      });
      
      setUsers(response.users);
      setPagination(response.pagination);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserHistory = async (userId: number) => {
    try {
      const response = await api.getUserHistory(userId);
      setUserHistory(response.history);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user history",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (userId: number) => {
    setIsActionLoading(true);
    try {
      await api.approveUser(userId, "Account approved by admin");
      toast({
        title: "Success",
        description: "User approved successfully",
      });
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve user",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReject = async (userId: number) => {
    setIsActionLoading(true);
    try {
      await api.rejectUser(userId, "Account rejected by admin");
      toast({
        title: "Success",
        description: "User rejected successfully",
      });
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleSuspend = async (userId: number) => {
    setIsActionLoading(true);
    try {
      await api.suspendUser(userId, "Account suspended by admin");
      toast({
        title: "Success",
        description: "User suspended successfully",
      });
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suspend user",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    loadUserHistory(user.id);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary", icon: Clock, text: "Pending" },
      approved: { variant: "default", icon: CheckCircle, text: "Approved" },
      rejected: { variant: "destructive", icon: XCircle, text: "Rejected" },
      suspended: { variant: "destructive", icon: PauseCircle, text: "Suspended" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant as "default" | "destructive" | "secondary" | "outline"} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Country', 'Mobile', 'Status', 'Created At', 'Last Login'],
      ...users.map(user => [
        user.name,
        user.email,
        user.country,
        user.mobile,
        user.status,
        user.created_at,
        user.last_login || 'Never'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gold-text mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and monitor platform activity</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={exportUsers}>
              <Download className="w-4 h-4 mr-2" />
              Export Users
            </Button>
            <Button className="premium-button">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle>User Management</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Pending
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Approved
                    </TabsTrigger>
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      All Users
                    </TabsTrigger>
                    <TabsTrigger value="suspended" className="flex items-center gap-2">
                      <PauseCircle className="w-4 h-4" />
                      Suspended
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab}>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No users found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredUsers.map((user) => (
                          <Card key={user.id} className="bg-secondary/50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="bg-primary/10 p-3 rounded-full">
                                    <Users className="w-6 h-6 text-primary" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{user.name}</h4>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-muted-foreground">
                                        {user.country} • {user.mobile}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  {getStatusBadge(user.status)}
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewDetails(user)}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    
                                    {user.status === 'pending' && (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => handleApprove(user.id)}
                                          disabled={isActionLoading}
                                        >
                                          <CheckCircle className="w-4 h-4 mr-1" />
                                          Approve
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() => handleReject(user.id)}
                                          disabled={isActionLoading}
                                        >
                                          <XCircle className="w-4 h-4 mr-1" />
                                          Reject
                                        </Button>
                                      </>
                                    )}
                                    
                                    {user.status === 'approved' && (
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleSuspend(user.id)}
                                        disabled={isActionLoading}
                                      >
                                        <PauseCircle className="w-4 h-4 mr-1" />
                                        Suspend
                                      </Button>
                                    )}
                                    
                                    {user.status === 'suspended' && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleApprove(user.id)}
                                        disabled={isActionLoading}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Reactivate
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                      <div className="flex justify-center mt-8 gap-2">
                        <Button
                          variant="outline"
                          disabled={pagination.page === 1}
                          onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                        >
                          Previous
                        </Button>
                        
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={pagination.page === page ? "default" : "outline"}
                            onClick={() => setPagination(prev => ({ ...prev, page }))}
                          >
                            {page}
                          </Button>
                        ))}
                        
                        <Button
                          variant="outline"
                          disabled={pagination.page === pagination.pages}
                          onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - User Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedUser ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                      <p className="text-muted-foreground">{selectedUser.email}</p>
                      <div className="mt-2">
                        {getStatusBadge(selectedUser.status)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Country</span>
                        <p>{selectedUser.country}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Mobile</span>
                        <p>{selectedUser.mobile}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Joined</span>
                        <p>{formatDate(selectedUser.created_at)}</p>
                      </div>
                      {selectedUser.last_login && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Last Login</span>
                          <p>{formatDate(selectedUser.last_login)}</p>
                        </div>
                      )}
                      {selectedUser.approved_at && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Approved By</span>
                          <p>{selectedUser.approved_by_name || 'Admin'}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(selectedUser.approved_at)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Approval History */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Approval History
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {userHistory.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No history available</p>
                        ) : (
                          userHistory.map((history, index) => (
                            <div key={index} className="text-sm p-3 bg-secondary rounded-lg">
                              <div className="flex justify-between items-start mb-1">
                                <Badge variant={
                                  history.action === 'approved' ? 'default' : 
                                  history.action === 'rejected' ? 'destructive' : 'secondary'
                                }>
                                  {history.action}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(history.created_at)}
                                </span>
                              </div>
                              <p className="font-medium">{history.admin_name}</p>
                              <p className="text-muted-foreground">{history.admin_email}</p>
                              {history.reason && (
                                <p className="mt-1 text-xs">{history.reason}</p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a user to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Users</span>
                  <Badge variant="outline">{pagination.total}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pending Approval</span>
                  <Badge variant="secondary">
                    {users.filter(u => u.status === 'pending').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Users</span>
                  <Badge variant="default">
                    {users.filter(u => u.status === 'approved').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
