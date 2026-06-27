interface Task {
  id: number;
  title: string;
  client: string;
  time: string;
  amount: string;
  icon: React.ReactNode;
}

const tasks: Task[] = [
  {id: 1,
    title: "إصلاح سباكة",
    client: "أحمد محمد • اليوم",
    time: "اليوم",
    amount: "٣٥ ج.م",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>),},
  {id: 2,
    title: "فحص كهرباء",
    client: "نادر صلاح • أمس",
    time: "أمس",
    amount: "٤٣ ج.م",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),},
  {id: 3,
    title: "تنظيف عميق",
    client: "عمر تامر • منذ يومين",
    time: "منذ يومين",
    amount: "٨٠ ج.م",
    icon: (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>),},];
export default function RecentTasks() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex-1">
      <h2 className="text-sm font-semibold text-gray-800 mb-4 text-right">المهام الأخيرة</h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                {task.icon}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{task.title}</div>
                <div className="text-xs text-gray-400">{task.client}</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700 shrink-0">{task.amount}</span>
          </div>))}
      </div>
    </div>
  );
}