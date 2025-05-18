import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  assignee?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface TaskCardProps {
  task: Task;
  onChangeStatus: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onChangeStatus, onDelete, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task',
      task,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="card-hover group cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge className={cn(getPriorityColor(task.priority), 'uppercase transition-colors duration-200 group-hover:scale-105')}>
            {task.priority}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onChangeStatus(task.id, 'todo')}
                disabled={task.status === 'todo'}
              >
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangeStatus(task.id, 'inProgress')}
                disabled={task.status === 'inProgress'}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangeStatus(task.id, 'done')}
                disabled={task.status === 'done'}
              >
                Done
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="text-lg font-medium mt-3 mb-2 transition-colors duration-200 group-hover:text-primary">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 transition-colors duration-200 group-hover:text-foreground">{task.description}</p>

        <div className="flex items-center justify-between mt-4">
          {task.assignee ? (
            <div className="flex items-center transition-transform duration-200 group-hover:scale-105">
              <Avatar className="h-6 w-6 mr-2 ring-2 ring-background transition-all duration-200 group-hover:ring-primary">
                <AvatarImage src={task.assignee.avatarUrl} />
                <AvatarFallback>
                  {task.assignee.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{task.assignee.name}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Unassigned</span>
          )}

          {task.dueDate && (
            <span className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
              Due {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to create classnames
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default TaskCard;
