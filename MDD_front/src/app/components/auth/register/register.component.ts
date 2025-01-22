import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../interfaces/registerRequest.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  public onError = false;

  public registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.min(2),
          Validators.max(30)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.min(8),
          Validators.max(40)
        ]
      ]
    });
  }

  public onSubmit(): void {
    const registerRequest = this.registerForm.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
      next: (_: void) => {
        this.router.navigate(['/auth/login'])
      },
      error: _ => {
        this.onError = true
      },
    }
    );
  }

}
