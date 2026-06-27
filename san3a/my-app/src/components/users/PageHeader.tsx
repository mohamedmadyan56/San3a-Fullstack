interface PageHeaderProps {
  onAddUser: () => void;
}

export default function PageHeader({ onAddUser }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
        <p className="text-sm text-gray-500 mt-1">مراجعة والتحقق وإدارة جميع مستخدمي المنصة</p>
      </div>
      <button
        onClick={onAddUser}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        إضافة مستخدم جديد
      </button>
    </div>
  );
}