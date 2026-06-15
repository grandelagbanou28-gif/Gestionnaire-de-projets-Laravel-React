import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/useTranslation';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ColumnHeader = ({ title, color, count }) => {
    const colors = {
        amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    };
    return (
        <div className={`flex items-center justify-between px-4 py-3 border-b ${colors[color]}`}>
            <h3 className="font-semibold text-sm">{title}</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/50 dark:bg-gray-800/50">{count}</span>
        </div>
    );
};

const TaskCard = ({ task, index }) => (
    <Draggable draggableId={String(task.id)} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow ${
                    snapshot.isDragging ? 'shadow-lg ring-2 ring-omni-500/30 rotate-2' : 'hover:shadow-md'
                }`}
            >
                <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={route('tasks.show', task.id)} className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-omni-600 dark:hover:text-omni-400 truncate">
                        {task.title}
                    </Link>
                </div>
                {task.project && (
                    <Link href={route('projects.show', task.project.id)} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-omni-600 mb-2">
                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        {task.project.name}
                    </Link>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    {task.assigned_user ? (
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="h-5 w-5 rounded-full bg-omni-100 dark:bg-omni-900/50 flex items-center justify-center text-[10px] font-bold text-omni-600 dark:text-omni-400">
                                {task.assigned_user.name.charAt(0).toUpperCase()}
                            </span>
                            {task.assigned_user.name}
                        </span>
                    ) : (
                        <span className="text-xs text-gray-400">Unassigned</span>
                    )}
                    {task.due_date && (
                        <span className={`text-xs ${new Date(task.due_date) < new Date() ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                            {task.due_date}
                        </span>
                    )}
                </div>
            </div>
        )}
    </Draggable>
);

export default function Kanban({ auth, columns }) {
    const { t } = useTranslation();
    const [colData, setColData] = useState(columns);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCol = { ...colData[source.droppableId] };
        const destCol = { ...colData[destination.droppableId] };
        const sourceTasks = [...sourceCol.tasks];
        const [moved] = sourceTasks.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceTasks.splice(destination.index, 0, moved);
            setColData({ ...colData, [source.droppableId]: { ...sourceCol, tasks: sourceTasks } });
        } else {
            const destTasks = [...destCol.tasks];
            destTasks.splice(destination.index, 0, moved);
            setColData({
                ...colData,
                [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
                [destination.droppableId]: { ...destCol, tasks: destTasks },
            });
        }

        router.patch(route('tasks.update-status', draggableId), {
            status: destination.droppableId,
        }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{t('Kanban Board')}</h2>
                    <Link href={route('tasks.create')} className="btn-gradient inline-flex items-center gap-1.5 text-sm px-4 py-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Task
                    </Link>
                </div>
            }
        >
            <Head title={t('Kanban Board')} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(colData).map(([id, col]) => (
                                <div key={id} className="rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <ColumnHeader title={col.title} color={col.color} count={col.tasks.length} />
                                    <Droppable droppableId={id}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`p-3 space-y-3 min-h-[200px] transition-colors ${
                                                    snapshot.isDraggingOver ? 'bg-omni-50/50 dark:bg-omni-900/10' : ''
                                                }`}
                                            >
                                                {col.tasks.map((task, index) => (
                                                    <TaskCard key={task.id} task={task} index={index} />
                                                ))}
                                                {provided.placeholder}
                                                {col.tasks.length === 0 && (
                                                    <div className="flex items-center justify-center h-24 text-sm text-gray-400">
                                                        Drop tasks here
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}