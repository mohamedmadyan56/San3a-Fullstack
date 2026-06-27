export type UserStatus = "نشط" | "غير نشط" | "موقوف";
export type UserRole = "مدير" | "عضو" | "غير محدد";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  avatar?: string;
  permissions: string[];
}