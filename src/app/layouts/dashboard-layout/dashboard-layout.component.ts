import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { UserState } from '../../stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/user/user.selectors';

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

  constructor(
    private userStore: Store<UserState>
  ) {
    this.user$ = this.userStore.select(selectUser);
  }

  toggleDashboardMenu() {
    this.isDashboardMenuOpen = !this.isDashboardMenuOpen;
  }
}
