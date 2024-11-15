import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  isDashboardMenuOpen = false;
  user$!: Observable<any>;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }
  
    toggleDashboardMenu() {
      this.isDashboardMenuOpen = !this.isDashboardMenuOpen;
    }
}
