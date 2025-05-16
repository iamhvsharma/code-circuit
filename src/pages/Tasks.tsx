
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TaskCard, { Task, TaskStatus } from '@/components/tasks/TaskCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Mock data for tasks
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete website redesign',
    description: 'Finish the new homepage design and update brand assets.',
    priority: 'high',
    status: 'todo',
    dueDate: new Date('2025-05-25'),
    assignee: {
      id: '101',
      name: 'Alex Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    }
  },
  {
    id: '2',
    title: 'Quarterly financial review',
    description: 'Prepare reports for the Q2 financial review meeting.',
    priority: 'medium',
    status: 'inProgress',
    dueDate: new Date('2025-05-20'),
    assignee: {
      id: '102',
      name: 'Sarah Chen',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: '3',
    title: 'Client onboarding flow',
    description: 'Design and implement the new client onboarding process.',
    priority: 'high',
    status: 'inProgress',
    dueDate: new Date('2025-05-18')
  },
  {
    id: '4',
    title: 'Update privacy policy',
    description: 'Review and update the privacy policy for compliance.',
    priority: 'low',
    status: 'done',
    dueDate: new Date('2025-05-10'),
    assignee: {
      id: '103',
      name: 'Michael Brown',
      avatarUrl: 'https://i.pravatar.cc/150?img=8'
    }
  },
  {
    id: '5',
    title: 'Sales team training',
    description: 'Prepare materials for the new sales team training session.',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date('2025-05-30'),
    assignee: {
      id: '104',
      name: 'Emily Taylor',
      avatarUrl: 'https://i.pravatar.cc/150?img=9'
    }
  },
  {
    id: '6',
    title: 'Software deployment',
    description: 'Coordinate with IT for the new software deployment.',
    priority: 'high',
    status: 'todo',
    dueDate: new Date('2025-05-22')
  },
  {
    id: '7',
    title: 'Social media strategy',
    description: 'Develop content calendar for Q3 social media campaign.',
    priority: 'low',
    status: 'done',
    dueDate: new Date('2025-05-08'),
    assignee: {
      id: '105',
      name: 'David Kim',
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    }
  },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // State for new task form
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date(),
  });
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleChangeStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully');
  };

  const handleCreateTask = () => {
    if (!newTask.title) {
      toast.error('Task title is required');
      return;
    }

    const task: Task = {
      id: `${Date.now()}`,
      title: newTask.title,
      description: newTask.description || '',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      status: newTask.status as TaskStatus,
      dueDate: newTask.dueDate,
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(),
    });
    setIsDialogOpen(false);
    toast.success('Task created successfully');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Task Management</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your board.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newTask.priority} 
                      onValueChange={(value) => setNewTask({...newTask, priority: value as 'low' | 'medium' | 'high'})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newTask.status} 
                      onValueChange={(value) => setNewTask({...newTask, status: value as TaskStatus})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateTask}>Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div>
              <Card>
                <CardHeader className="bg-neutral-bg border-b border-border">
                  <CardTitle className="text-lg flex items-center">
                    To Do
                    <span className="ml-2 px-2 py-0.5 bg-neutral-bg text-muted-foreground text-xs rounded-full">
                      {todoTasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="space-y-4">
                    {todoTasks.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No tasks to do</p>
                    ) : (
                      todoTasks.map(task => (
                        <TaskCard 
                          key={task.id}
                          task={task}
                          onChangeStatus={handleChangeStatus}
                          onDelete={handleDeleteTask}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* In Progress Column */}
            <div>
              <Card>
                <CardHeader className="bg-neutral-bg border-b border-border">
                  <CardTitle className="text-lg flex items-center">
                    In Progress
                    <span className="ml-2 px-2 py-0.5 bg-neutral-bg text-muted-foreground text-xs rounded-full">
                      {inProgressTasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="space-y-4">
                    {inProgressTasks.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No tasks in progress</p>
                    ) : (
                      inProgressTasks.map(task => (
                        <TaskCard 
                          key={task.id}
                          task={task}
                          onChangeStatus={handleChangeStatus}
                          onDelete={handleDeleteTask}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Done Column */}
            <div>
              <Card>
                <CardHeader className="bg-neutral-bg border-b border-border">
                  <CardTitle className="text-lg flex items-center">
                    Done
                    <span className="ml-2 px-2 py-0.5 bg-neutral-bg text-muted-foreground text-xs rounded-full">
                      {doneTasks.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <div className="space-y-4">
                    {doneTasks.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No completed tasks</p>
                    ) : (
                      doneTasks.map(task => (
                        <TaskCard 
                          key={task.id}
                          task={task}
                          onChangeStatus={handleChangeStatus}
                          onDelete={handleDeleteTask}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tasks;
