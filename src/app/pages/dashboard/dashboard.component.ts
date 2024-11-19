import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from '../../stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../../stores/user/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user$!: Observable<any>;

  constructor(private userStore: Store<UserState>) {
    this.user$ = this.userStore.select(selectUser);
  }
}
