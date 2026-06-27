"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/users/PageHeader";
import SearchBar from "@/components/users/SearchBar";
import UserFilters from "@/components/users/UserFilters";
import UserTable from "@/components/users/UserTable";
import Pagination from "@/components/users/Pagination";
import { users as allUsers } from "@/data/users";
import { UserStatus, UserRole } from "@/types/user";

const ITEMS_PER_PAGE = 3;
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | "الجميع">("الجميع");
  const [selectedRole, setSelectedRole] = useState<UserRole | "جميع الأدوار">("جميع الأدوار");
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = useMemo(() => {
    return allUsers.filter((user) => {
      const matchSearch =
        !search ||
        user.name.includes(search) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = selectedStatus === "الجميع" || user.status === selectedStatus;
      const matchRole = selectedRole === "جميع الأدوار" || user.role === selectedRole;
      return matchSearch && matchStatus && matchRole;
    });
  }, [search, selectedStatus, selectedRole]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE);
  function handleFilterChange() {
    setCurrentPage(1);}
  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Navbar/>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <main className="flex-1 p-6 space-y-6">
            <PageHeader onAddUser={() => alert("سيتم إضافة مستخدم جديد")} />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <UserFilters selectedStatus={selectedStatus}
                selectedRole={selectedRole}
                onStatusChange={(s) => { setSelectedStatus(s); handleFilterChange(); }}
                onRoleChange={(r) => { setSelectedRole(r); handleFilterChange(); }}/>
              <SearchBar value={search}
                onChange={(v) => { setSearch(v); handleFilterChange(); }}/>
            </div>
            <UserTable users={paginated}/>
            <Pagination currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}/>
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );}