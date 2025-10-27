import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Search } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "active" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor", status: "inactive" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "active" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "User", status: "active" },
];

const Tables = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const modifier = sortOrder === "asc" ? 1 : -1;
      return aVal > bVal ? modifier : -modifier;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Tables & Lists
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice testing tables, sorting, filtering, and pagination
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management Table</CardTitle>
            <CardDescription>Test table interactions, sorting, and filtering</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                data-testid="search-input"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid="sort-id"
                        onClick={() => handleSort("id")}
                      >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid="sort-name"
                        onClick={() => handleSort("name")}
                      >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid="sort-email"
                        onClick={() => handleSort("email")}
                      >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid="sort-role"
                        onClick={() => handleSort("role")}
                      >
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center" data-testid="no-results">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                        <TableCell data-testid={`user-id-${user.id}`}>{user.id}</TableCell>
                        <TableCell data-testid={`user-name-${user.id}`}>{user.name}</TableCell>
                        <TableCell data-testid={`user-email-${user.id}`}>{user.email}</TableCell>
                        <TableCell data-testid={`user-role-${user.id}`}>{user.role}</TableCell>
                        <TableCell data-testid={`user-status-${user.id}`}>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              user.status === "active"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            data-testid={`edit-user-${user.id}`}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground" data-testid="results-count">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" data-testid="prev-page">
                  Previous
                </Button>
                <Button size="sm" variant="outline" data-testid="next-page">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Tables;
