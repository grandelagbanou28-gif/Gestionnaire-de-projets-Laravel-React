import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { TASK_STATUSES_CLASS_MAP, TASK_STATUSES_TEXT_MAP } from "@/constants.jsx";
import { useTranslation } from '@/hooks/useTranslation';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const StatCard = ({ label, value, total, icon, color }) => (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <p className="mt-2 flex items-baseline gap-1.5">
                    <span className={`text-3xl font-bold ${color}`}>{value}</span>
                    {total !== undefined && (
                        <span className="text-sm text-gray-400">/ {total}</span>
                    )}
                </p>
            </div>
            <div className={`p-3 rounded-xl bg-opacity-10 ${color.replace('text', 'bg').replace('500', '100')} dark:bg-opacity-20`}>
                <svg className={`h-6 w-6 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
            </div>
        </div>
    </div>
);

const DONUT_COLORS = ['#f59e0b', '#3b82f6', '#10b981'];

export default function Dashboard({
    auth, myPendingTasks, totalPendingTasks, myInProgressTasks,
    totalInProgressTasks, myCompletedTasks, totalCompletedTasks,
    activeTasks, totalProjects, totalTasks, totalUsers,
    overdueTasks, tasksByStatus, projects
}) {
    const { t } = useTranslation();

    const stats = [
        { label: 'Total Projects', value: totalProjects, color: 'text-violet-600', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
        { label: 'Total Tasks', value: totalTasks, color: 'text-blue-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { label: 'Team Members', value: totalUsers, color: 'text-emerald-600', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
        { label: 'Overdue Tasks', value: overdueTasks, color: 'text-rose-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{t('Dashboard')}</h2>}
        >
            <Head title={t('Dashboard')} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Top stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map(s => <StatCard key={s.label} {...s} />)}
                    </div>

                    {/* Task progress cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 rounded-full bg-amber-500" />
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pending</h3>
                            </div>
                            <p className="text-3xl font-bold text-amber-500">{myPendingTasks}</p>
                            <p className="text-sm text-gray-500 mt-1">of {totalPendingTasks} total</p>
                            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${totalPendingTasks ? (myPendingTasks / totalPendingTasks) * 100 : 0}%` }} />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 rounded-full bg-blue-500" />
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">In Progress</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-500">{myInProgressTasks}</p>
                            <p className="text-sm text-gray-500 mt-1">of {totalInProgressTasks} total</p>
                            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${totalInProgressTasks ? (myInProgressTasks / totalInProgressTasks) * 100 : 0}%` }} />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Completed</h3>
                            </div>
                            <p className="text-3xl font-bold text-emerald-500">{myCompletedTasks}</p>
                            <p className="text-sm text-gray-500 mt-1">of {totalCompletedTasks} total</p>
                            <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${totalCompletedTasks ? (myCompletedTasks / totalCompletedTasks) * 100 : 0}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Donut chart */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tasks by Status</h3>
                            <div className="flex items-center justify-center h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={tasksByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                                            {tasksByStatus.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-3 ml-4">
                                    {tasksByStatus.map(s => (
                                        <div key={s.name} className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{s.name}</span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bar chart */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tasks per Project</h3>
                            <div className="h-64">
                                {projects.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={projects} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                                            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <Tooltip />
                                            <Bar dataKey="pending" name="Pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#3b82f6" />
                                            <Bar dataKey="completed" name="Completed" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No project data</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Tasks Table */}
                    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Active Tasks</h3>
                        </div>
                        <div className="overflow-x-auto">
                            {activeTasks.data.length > 0 ? (
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {activeTasks.data.map(task => (
                                            <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <Link href={route('projects.show', task.project.id)} className="font-medium text-omni-600 dark:text-omni-400 hover:underline">
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link href={route('tasks.show', task.id)} className="text-gray-900 dark:text-gray-100 hover:underline">
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TASK_STATUSES_CLASS_MAP[task.status]}`}>
                                                        {TASK_STATUSES_TEXT_MAP[task.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{task.due_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="px-6 py-12 text-center text-gray-400">No active tasks assigned to you.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}