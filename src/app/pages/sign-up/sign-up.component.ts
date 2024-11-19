import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserState } from '../../stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { setUser } from '../../stores/user/user.actions';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  name: string = '';
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
      detail: 'Sign up successfully!',
    });
  }

  showErrorToast(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    });
  }

  signUpWithEmail() {
    this.authService
      .signUpWithEmail(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          };
          this.store.dispatch(setUser({ user: userInfo }));
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
          const userInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          };
          this.store.dispatch(setUser({ user: userInfo }));
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
          const userInfo = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          };
          this.store.dispatch(setUser({ user: userInfo }));
        }
        this.showSuccessToast();
        this.router.navigate(['/']);
      })
      .catch((error) => this.showErrorToast(error));
  }
}
