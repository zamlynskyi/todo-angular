
import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  filter: string = 'all';
  editIndex: number | null = null;
  editedTask: Task = this.emptyTask();

  constructor(public taskService: TaskService) {}

  emptyTask(): Task {
    return {
      text: '',
      deadline: '',
      description: '',
      priority: 'низький',
      category: 'робота',
      completed: false
    };
  }

  toggleComplete(index: number): void {
    this.taskService.toggleComplete(index);
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
  }

  clearAll(): void {
    this.taskService.clearAll();
  }

  getFilteredTasks(): Task[] {
    const tasks = this.taskService.getTasks();
    if (this.filter === 'completed') return tasks.filter(t => t.completed);
    if (this.filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  }

  startEdit(index: number): void {
    this.editIndex = index;
    this.editedTask = { ...this.taskService.getTasks()[index] };
  }

  saveEdit(): void {
    if (this.editIndex !== null) {
      this.taskService.updateTask(this.editIndex, this.editedTask);
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editIndex = null;
    this.editedTask = this.emptyTask();
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.taskService.getTasks(), event.previousIndex, event.currentIndex);
  }
}
