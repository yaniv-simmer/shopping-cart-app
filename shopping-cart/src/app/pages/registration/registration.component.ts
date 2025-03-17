import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  // Custom validator: Check if password contains at least one uppercase letter.
  passwordValidator(control: AbstractControl) {
    const value = control.value;
    return value && !/[A-Z]/.test(value) ? { noCapital: true } : null;
  }

  // Custom validator: Check if password and confirm password match. //TODO: 
  passwordsMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  register() {
    if (this.registrationForm.invalid) return;

    const { email, password } = this.registrationForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((user: any) => user.email === email)) {
      this.errorMessage = 'User already exists';
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Navigate to login page after successful registration.
    this.router.navigate(['/login']);
  }
}
