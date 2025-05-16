
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
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onChangeStatus, onDelete }) => {
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
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge className={cn(getPriorityColor(task.priority), 'uppercase')}>
            {task.priority}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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

        <h3 className="text-lg font-medium mt-3 mb-2">{task.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

        <div className="flex items-center justify-between mt-4">
          {task.assignee ? (
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
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
            <span className="text-xs text-muted-foreground">
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
