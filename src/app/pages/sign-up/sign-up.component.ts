import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signUpWithEmail() {
    this.authService.signUpWithEmail(this.email, this.password)
      .then(() => {
        console.log('Signed up successfully');
        this.router.navigate(['/']);
      })
      .catch(error => console.error('Error signing up:', error));
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
