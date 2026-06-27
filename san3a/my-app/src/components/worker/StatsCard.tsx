interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;}

export default function StatsCard({ label, value, change, positive = true, icon }: StatsCardProps) {
  return (<div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {change}
          </span>)}
      </div>
      <div>
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-2xl font-bold text-gray-900 mt-0.5">{value}</div>
      </div>
    </div>);}