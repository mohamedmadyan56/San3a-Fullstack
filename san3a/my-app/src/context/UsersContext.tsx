"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { users as initialUsers } from "@/data/users";
import { User, UserStatus, UserRole } from "@/types/user";
const ITEMS_PER_PAGE = 3;
interface UsersContextType {
  users: User[];
  paginated: User[];
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  search: string;
  selectedStatus: UserStatus | "الجميع";
  selectedRole: UserRole | "جميع الأدوار";
  currentPage: number;
  setSearch: (v: string) => void;
  setSelectedStatus: (v: UserStatus | "الجميع") => void;
  setSelectedRole: (v: UserRole | "جميع الأدوار") => void;
  setCurrentPage: (v: number) => void;
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  updateUser: (user: User) => void;
}
const UsersContext = createContext<UsersContextType | null>(null);
export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearchRaw] = useState("");
  const [selectedStatus, setSelectedStatusRaw] = useState<UserStatus | "الجميع">("الجميع");
  const [selectedRole, setSelectedRoleRaw] = useState<UserRole | "جميع الأدوار">("جميع الأدوار");
  const [currentPage, setCurrentPage] = useState(1);
  function resetPage() {
    setCurrentPage(1);
  }
  function setSearch(v: string) { setSearchRaw(v); resetPage(); }
  function setSelectedStatus(v: UserStatus | "الجميع") { setSelectedStatusRaw(v); resetPage(); }
  function setSelectedRole(v: UserRole | "جميع الأدوار") { setSelectedRoleRaw(v); resetPage(); }
  function addUser(user: User) {
    setUsers((prev) => [user, ...prev]);
    resetPage();
  }
  function deleteUser(id: number) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    resetPage();
  }
  function updateUser(updated: User) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }
  const filtered = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        !search ||
        user.name.includes(search) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = selectedStatus === "الجميع" || user.status === selectedStatus;
      const matchRole = selectedRole === "جميع الأدوار" || user.role === selectedRole;
      return matchSearch && matchStatus && matchRole;
    });
  }, [users, search, selectedStatus, selectedRole]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <UsersContext.Provider
      value={{
        users: filtered,
        paginated,
        totalPages,
        totalItems: filtered.length,
        itemsPerPage: ITEMS_PER_PAGE,
        search,
        selectedStatus,
        selectedRole,
        currentPage,
        setSearch,
        setSelectedStatus,
        setSelectedRole,
        setCurrentPage,
        addUser,
        deleteUser,
        updateUser,
      }}>
      {children}
    </UsersContext.Provider>
  );
}
export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside UsersProvider");
  return ctx;
}