// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import auth from '../../../firebase.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = auth;

  constructor() {}
  
  getCurrentUser(): Observable<User | null> {
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, (user) => subscriber.next(user), (error) => subscriber.error(error));
    });
  }

  async signUpWithEmail(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed up with email:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in with email:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log('Signed in with Google:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signInWithGitHub() {
    const provider = new GithubAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log('Signed in with GitHub:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

}
