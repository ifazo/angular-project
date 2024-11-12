import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sign in successfully!',
    });
  }

  showErrorToast(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }

  signInWithEmail() {
    this.authService
      .signInWithEmail(this.email, this.password)
      .then(() => {
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(() => {
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }

  signInWithGitHub() {
    this.authService
      .signInWithGitHub()
      .then(() => {
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }
}
