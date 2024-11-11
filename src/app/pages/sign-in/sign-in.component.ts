import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signInWithEmail() {
    this.authService.signInWithEmail(this.email, this.password)
      .then(() => {
        console.log('Signed in successfully');
        this.router.navigate(['/']);
      })
      .catch(error => console.error('Error signing in:', error));
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => this.router.navigate(['/']))
      .catch(error => console.error('Google sign-in error:', error));
  }

  signInWithGitHub() {
    this.authService.signInWithGitHub()
      .then(() => this.router.navigate(['/']))
      .catch(error => console.error('GitHub sign-in error:', error));
  }
}
