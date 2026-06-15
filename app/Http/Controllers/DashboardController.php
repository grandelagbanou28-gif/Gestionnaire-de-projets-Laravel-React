<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function index(Request $request): Response|ResponseFactory
    {
        $user = $request->user();

        $totalPendingTasks = Task::pending()->count();
        $myPendingTasks = Task::pending()->assignedTo($user)->count();

        $totalInProgressTasks = Task::inProgress()->count();
        $myInProgressTasks = Task::inProgress()->assignedTo($user)->count();

        $totalCompletedTasks = Task::completed()->count();
        $myCompletedTasks = Task::completed()->assignedTo($user)->count();

        $activeTasks = Task::active()->assignedTo($user)->orderBy('due_date')
            ->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        $totalProjects = Project::count();
        $totalTasks = Task::count();
        $totalUsers = User::count();
        $overdueTasks = Task::where('due_date', '<', now())->whereNotIn('status', ['completed', 'done'])->count();

        $tasksByStatus = [
            ['name' => 'Pending', 'value' => Task::pending()->count(), 'color' => '#f59e0b'],
            ['name' => 'In Progress', 'value' => Task::inProgress()->count(), 'color' => '#3b82f6'],
            ['name' => 'Completed', 'value' => Task::completed()->count(), 'color' => '#10b981'],
        ];

        $projects = Project::withCount(['tasks as pending_tasks' => fn($q) => $q->pending()])
            ->withCount(['tasks as in_progress_tasks' => fn($q) => $q->inProgress()])
            ->withCount(['tasks as completed_tasks' => fn($q) => $q->completed()])
            ->limit(10)->get()
            ->map(fn($p) => [
                'name' => $p->name,
                'pending' => (int) $p->pending_tasks,
                'inProgress' => (int) $p->in_progress_tasks,
                'completed' => (int) $p->completed_tasks,
            ]);

        return inertia('Dashboard', compact(
            'totalPendingTasks', 'myPendingTasks',
            'totalInProgressTasks', 'myInProgressTasks',
            'totalCompletedTasks', 'myCompletedTasks',
            'activeTasks', 'totalProjects', 'totalTasks',
            'totalUsers', 'overdueTasks', 'tasksByStatus', 'projects'
        ));
    }
}