
import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  text = '';
  deadline = '';
  description = '';
  priority = 'низький';
  category = 'робота';

  constructor(private taskService: TaskService) {}

  addTask(form: any) {
    if (form.invalid) return;
    const task: Task = {
      text: this.text.trim(),
      deadline: this.deadline || 'Без дедлайну',
      description: this.description.trim() || 'Без опису',
      priority: this.priority,
      category: this.category,
      completed: false
    };
    this.taskService.addTask(task);
    form.resetForm({ priority: 'низький', category: 'робота' });
  }
}
