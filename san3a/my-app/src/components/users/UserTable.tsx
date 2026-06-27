import { User } from "@/types/user";
import UserRow from "./UserRow";

const columns = [
  { label: "تفاصيل المستخدم", className: "w-64" },
  { label: "الدور", className: "w-32" },
  { label: "الحالة", className: "w-32" },
  { label: "تاريخ الانضمام", className: "w-40" },
  { label: "الصلاحيات", className: "" },
  { label: "إجراءات", className: "w-24" },
];
interface UserTableProps {
  users: User[];
}
export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right" dir="rtl">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${col.className}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => <UserRow key={user.id} user={user} />)
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-gray-400 text-sm">
                  لا يوجد مستخدمون مطابقون للبحث
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}