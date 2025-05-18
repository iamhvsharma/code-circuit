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
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // State for new task form
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date(),
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Check if we're dropping over a task or a column
    const overTask = tasks.find(t => t.id === overId);
    const overColumn = overId as TaskStatus;

    // If dropping over a task, use that task's status
    if (overTask) {
      setTasks(prev => 
        prev.map(t => 
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
    }
    // If dropping over a column (empty section), use that column's status
    else if (['todo', 'inProgress', 'done'].includes(overColumn)) {
      setTasks(prev => 
        prev.map(t => 
          t.id === activeId ? { ...t, status: overColumn } : t
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find(t => t.id === activeId);
    if (!activeTask) return;

    // Check if we're dropping over a task or a column
    const overTask = tasks.find(t => t.id === overId);
    const overColumn = overId as TaskStatus;

    // If dropping over a task, use that task's status
    if (overTask) {
      setTasks(prev => 
        prev.map(t => 
          t.id === activeId ? { ...t, status: overTask.status } : t
        )
      );
      toast.success(`Task moved to ${overTask.status}`);
    }
    // If dropping over a column (empty section), use that column's status
    else if (['todo', 'inProgress', 'done'].includes(overColumn)) {
      setTasks(prev => 
        prev.map(t => 
          t.id === activeId ? { ...t, status: overColumn } : t
        )
      );
      toast.success(`Task moved to ${overColumn}`);
    }
  };

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

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;

    if (!editingTask.title) {
      toast.error('Task title is required');
      return;
    }

    setTasks(prev => 
      prev.map(task => 
        task.id === editingTask.id ? editingTask : task
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingTask(null);
    toast.success('Task updated successfully');
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

          <DndContext 
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
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
                  <CardContent 
                    className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar"
                    data-status="todo"
                  >
                    <SortableContext items={todoTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4 min-h-[100px]">
                        {todoTasks.length === 0 ? (
                          <div 
                            className="h-[100px] flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg transition-colors duration-200 hover:border-primary/50"
                            data-status="todo"
                          >
                            <p className="text-center text-muted-foreground">Drop tasks here</p>
                          </div>
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
                    </SortableContext>
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
                  <CardContent 
                    className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar"
                    data-status="inProgress"
                  >
                    <SortableContext items={inProgressTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4 min-h-[100px]">
                        {inProgressTasks.length === 0 ? (
                          <div 
                            className="h-[100px] flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg transition-colors duration-200 hover:border-primary/50"
                            data-status="inProgress"
                          >
                            <p className="text-center text-muted-foreground">Drop tasks here</p>
                          </div>
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
                    </SortableContext>
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
                  <CardContent 
                    className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar"
                    data-status="done"
                  >
                    <SortableContext items={doneTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-4 min-h-[100px]">
                        {doneTasks.length === 0 ? (
                          <div 
                            className="h-[100px] flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg transition-colors duration-200 hover:border-primary/50"
                            data-status="done"
                          >
                            <p className="text-center text-muted-foreground">Drop tasks here</p>
                          </div>
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
                    </SortableContext>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DragOverlay>
              {activeTask ? (
                <TaskCard
                  task={activeTask}
                  onChangeStatus={handleChangeStatus}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Edit Task Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Make changes to your task here.
                </DialogDescription>
              </DialogHeader>
              {editingTask && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editingTask.description}
                      onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select 
                      value={editingTask.priority} 
                      onValueChange={(value) => setEditingTask({...editingTask, priority: value as 'low' | 'medium' | 'high'})}
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
                    <Label htmlFor="edit-status">Status</Label>
                    <Select 
                      value={editingTask.status} 
                      onValueChange={(value) => setEditingTask({...editingTask, status: value as TaskStatus})}
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
                  <div className="grid gap-2">
                    <Label htmlFor="edit-due-date">Due Date</Label>
                    <Input
                      id="edit-due-date"
                      type="date"
                      value={editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditingTask({...editingTask, dueDate: new Date(e.target.value)})}
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleUpdateTask}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tasks;
