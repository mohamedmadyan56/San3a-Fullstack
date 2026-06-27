import { UserStatus, UserRole } from "@/types/user";

interface UserFiltersProps {
  selectedStatus: UserStatus | "الجميع";
  selectedRole: UserRole | "جميع الأدوار";
  onStatusChange: (status: UserStatus | "الجميع") => void;
  onRoleChange: (role: UserRole | "جميع الأدوار") => void;
}

const statusOptions: Array<UserStatus | "الجميع"> = ["الجميع", "نشط", "غير نشط", "موقوف"];
const roleOptions: Array<UserRole | "جميع الأدوار"> = ["جميع الأدوار", "مدير", "عضو", "غير محدد"];
function FilterSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="appearance-none pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 cursor-pointer transition"
        dir="rtl">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
export default function UserFilters({
  selectedStatus,
  selectedRole,
  onStatusChange,
  onRoleChange,
}: UserFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <FilterSelect
        value={selectedRole}
        options={roleOptions}
        onChange={onRoleChange}/>
      <FilterSelect
        value={selectedStatus}
        options={statusOptions}
        onChange={onStatusChange}/>
    </div>
  );
}