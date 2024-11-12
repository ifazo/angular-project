import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user$!: Observable<any>;
  isMobileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sign out successfully!',
    });
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error signing out!',
    });
  }

  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        this.showSuccessToast();
        this.router.navigate(['/sign-in'])
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
}
