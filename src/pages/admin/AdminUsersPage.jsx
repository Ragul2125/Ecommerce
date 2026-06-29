import { useState } from "react";
import { Search, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
const initialUsers = [
  { id: "USR-001", name: "Alice Johnson", email: "alice@example.com", joinedAt: "2026-01-15", status: "Active" },
  { id: "USR-002", name: "Bob Smith", email: "bob@example.com", joinedAt: "2026-02-20", status: "Active" },
  { id: "USR-003", name: "Charlie Davis", email: "charlie@example.com", joinedAt: "2026-03-10", status: "Suspended" }
];
function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      toast.success("User deleted successfully");
      setUserToDelete(null);
    }
  };
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Manage Users</h1>
          <p className="text-sm text-muted-foreground">View and manage customer accounts.</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
    placeholder="Search users by name or email..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
  />
        </div>
      </div>
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40 bg-card">
        {filteredUsers.length === 0 ? <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground mx-auto">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Users Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try searching for something else.
              </p>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">User</th>
                  <th className="p-6">Email</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredUsers.map((user) => <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{user.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground">{user.email}</td>
                    <td className="p-6 text-sm text-muted-foreground">{user.joinedAt}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${user.status === "Active" ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Button
    onClick={() => setUserToDelete(user.id)}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
  >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will remove all their data from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
export {
  AdminUsersPage
};
