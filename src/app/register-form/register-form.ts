import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  hide = signal(true);

  form!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) return;
    if (this.form.value.password !== this.form.value.password2) return; // TODO: display an error
    this.authService.register(this.form.value.username, this.form.value.password).subscribe({
      next: res => {
        this.router.navigate(['/home'])
      },
      error: err => console.error('error', err)
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
