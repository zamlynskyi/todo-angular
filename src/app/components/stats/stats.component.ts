import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  completed = 0;
  pending = 0;

  ngOnInit() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      this.completed = tasks.filter((t: any) => t.completed).length;
      this.pending = tasks.length - this.completed;
    }
  }
}
