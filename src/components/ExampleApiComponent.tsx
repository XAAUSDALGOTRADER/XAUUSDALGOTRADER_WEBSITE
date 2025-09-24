import { useUsers, useApproveUser } from '@/hooks/useItems';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ExampleApiComponent = () => {
  const { data: users, isLoading, error } = useUsers();
  const approveUserMutation = useApproveUser();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userId = parseInt(formData.get('userId') as string);
    
    if (userId) {
      approveUserMutation.mutate({ userId });
      e.currentTarget.reset();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Example API Component</h2>
      
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input 
          name="userId" 
          type="number"
          placeholder="Enter user ID to approve" 
          required 
        />
        <Button type="submit" disabled={approveUserMutation.isPending}>
          {approveUserMutation.isPending ? 'Approving...' : 'Approve User'}
        </Button>
      </form>
      
      <div>
        <h3 className="font-semibold mb-2">Users from API:</h3>
        <ul>
          {users?.users?.map((user) => (
            <li key={user.id} className="py-1">
              {user.id}: {user.name} ({user.status})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExampleApiComponent;