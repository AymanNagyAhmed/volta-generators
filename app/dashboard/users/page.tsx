"use client";

import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, SortDescriptor } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { useEffect, useState, useMemo } from "react";
import { isAuthenticated, isAdmin } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/lib/services/users.service";
import { User, CreateUserPayload } from "@/lib/types/users.types";
import { formatDate, truncateText } from "@/lib/utils/utils";

// Extended User type with index property
type IndexedUser = User & { index: number };

export default function DashboardUsersPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sorting state
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "index",
    direction: "ascending",
  });
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Form states
  const [formData, setFormData] = useState<CreateUserPayload>({
    email: "",
    password: ""
  });
  const [editFormData, setEditFormData] = useState<Partial<User>>({
    email: "",
    role: "user" as 'user' | 'admin' | 'manager',
    fullName: ""
  });

  useEffect(() => {
    // Check if user is authenticated and has admin role
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }

      const adminStatus = isAdmin();
      setAuthorized(adminStatus);
      
      if (adminStatus) {
        fetchUsers();
      }
    };

    checkAuth();
  }, [router]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Handle create user
  const handleCreateUser = async () => {
    try {
      setLoading(true);
      await createUser(formData);
      setIsCreateModalOpen(false);
      setFormData({ email: "", password: "" });
      fetchUsers();
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  // Handle update user
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      await updateUser(selectedUser.id, editFormData);
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      await deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      console.error("Error deleting user:", err);
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal with user data
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      email: user.email,
      role: user.role,
      fullName: user.fullName || ""
    });
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle edit form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle sorting
  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

  // Add index to users and sort based on current sort descriptor
  const sortedUsers = useMemo(() => {
    if (!users.length) return [];
    
    // Add index to each user
    const indexedUsers = users.map((user, index) => ({
      ...user,
      index: index + 1
    }));
    
    return [...indexedUsers].sort((a, b) => {
      const { column, direction } = sortDescriptor;
      const modifier = direction === "ascending" ? 1 : -1;
      
      switch (column) {
        case "index":
          return (a.index - b.index) * modifier;
        case "id":
          return a.id.localeCompare(b.id) * modifier;
        case "email":
          return a.email.localeCompare(b.email) * modifier;
        case "name":
          const nameA = a.fullName || "";
          const nameB = b.fullName || "";
          return nameA.localeCompare(nameB) * modifier;
        case "role":
          return a.role.localeCompare(b.role) * modifier;
        case "created":
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * modifier;
        default:
          return 0;
      }
    }) as IndexedUser[];
  }, [users, sortDescriptor]);

  // Show loading state while checking authorization
  if (authorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p>Loading...</p>
      </div>
    );
  }

  // Show unauthorized message if user is not an admin
  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Not Authorized</h2>
          <p>You do not have permission to access this page. Admin role is required.</p>
          <button 
            onClick={() => router.push("/profile")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className={title({ className: "text-gray-900 dark:text-white" })}>
            User Management
          </h1>
        </div>
        <Button 
          color="primary"
          className="bg-gray-800 hover:bg-gray-700 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add User
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Users Table */}
      <Card className="p-6">
        {loading && users.length === 0 ? (
          <div className="flex justify-center items-center p-8">
            <p>Loading users...</p>
          </div>
        ) : (
          <Table 
            aria-label="Users table"
            sortDescriptor={sortDescriptor}
            onSortChange={handleSortChange}
          >
            <TableHeader>
              <TableColumn key="index" allowsSorting>ID</TableColumn>
              <TableColumn key="email" allowsSorting>EMAIL</TableColumn>
              <TableColumn key="name" allowsSorting>NAME</TableColumn>
              <TableColumn key="role" allowsSorting>ROLE</TableColumn>
              <TableColumn key="created" allowsSorting>CREATED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="text-center p-4">
                      No users found
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.index}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fullName || "—"}</TableCell>
                    <TableCell>
                      <Chip
                        color={user.role === 'admin' ? "primary" : user.role === 'manager' ? "secondary" : "default"}
                        variant="flat"
                      >
                        {user.role}
                      </Chip>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => openEditModal(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => openDeleteModal(user)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create User Modal */}
      <Modal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              required
            />
            <Input
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onClick={handleCreateUser}
              isLoading={loading}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              name="email"
              value={editFormData.email}
              onChange={handleEditInputChange}
              type="email"
            />
            <Input
              label="Full Name"
              name="fullName"
              value={editFormData.fullName || ""}
              onChange={handleEditInputChange}
              type="text"
            />
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">
                  Role: {editFormData.role}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Role selection"
                onAction={(key) => setEditFormData({...editFormData, role: key as 'user' | 'admin' | 'manager'})}
              >
                <DropdownItem key="user">User</DropdownItem>
                <DropdownItem key="admin">Admin</DropdownItem>
                <DropdownItem key="manager">Manager</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onClick={handleUpdateUser}
              isLoading={loading}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete the user: {selectedUser?.email}?</p>
            <p className="text-red-500 mt-2">This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              color="danger" 
              onClick={handleDeleteUser}
              isLoading={loading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 