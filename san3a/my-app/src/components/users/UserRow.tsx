import { User } from "@/types/user";

const statusStyles: Record<User["status"], string> = {
  نشط: "bg-green-100 text-green-700",
  "غير نشط": "bg-gray-100 text-gray-600",
  موقوف: "bg-red-100 text-red-600",
};
const roleStyles: Record<User["role"], string> = {
  مدير: "bg-blue-100 text-blue-700",
  عضو: "bg-purple-100 text-purple-700",
  "غير محدد": "bg-yellow-100 text-yellow-700",
};
function getInitials(name: string) {
  return name.trim().charAt(0);
}
function getAvatarColor(id: number) {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  return colors[id % colors.length];
}
interface UserRowProps {
  user: User;
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white text-sm font-semibold shrink-0`}>
            {getInitials(user.name)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {user.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{user.joinDate}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {user.permissions.length > 0 ? (
            user.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {perm}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">—</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}