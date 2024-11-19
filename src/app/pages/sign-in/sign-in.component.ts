import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserState } from '../../stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { setUser } from '../../stores/user/user.actions';

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
    private store: Store<UserState>,
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
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.store.dispatch(setUser({ user }));
        }
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.store.dispatch(setUser({ user }));
        }
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }

  signInWithGitHub() {
    this.authService
      .signInWithGitHub()
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.store.dispatch(setUser({ user }));
        }
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }
}
