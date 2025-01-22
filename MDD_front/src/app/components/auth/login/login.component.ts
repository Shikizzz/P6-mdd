import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginRequest } from '../../../interfaces/loginRequest.interface';
import { SessionInformation } from '../../../interfaces/sessionInformation.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService) {
  }

  public onError = false;

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: [
        '',
        [
          Validators.required,
          Validators.min(2),
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
    const loginRequest = this.loginForm.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/articles'])
      },
      error: _ => {
        this.onError = true
      },
    }
    );
  }

}
