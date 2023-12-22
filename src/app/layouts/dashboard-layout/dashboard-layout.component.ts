import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  isDashboardMenuOpen = false;
  toggleDashboardMenu() {
    this.isDashboardMenuOpen = !this.isDashboardMenuOpen;
  }
}
