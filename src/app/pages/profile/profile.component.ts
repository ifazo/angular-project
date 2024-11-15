import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$!: Observable<any>;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }
}
