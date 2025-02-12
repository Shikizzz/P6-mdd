import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { SessionInformation } from '../interfaces/sessionInformation.class';
import { NgIf } from '@angular/common';
import { UserInformationDTO } from '../interfaces/userInformationDTO.interface';
import { AuthSuccess } from '../interfaces/authSuccess.interface';
import { Subscription } from 'rxjs';

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
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService) {
  }

  public onError = false;
  public loginSubscription: Subscription | undefined;
  public authenticateSubscription: Subscription | undefined;
  public loginForm!: FormGroup;

  ngOnInit(): void {

    let token: string | null = localStorage.getItem("jwtToken");
    if (token !== null) { this.authenticateUser(token) }

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

  ngOnDestroy(): void {
    if (this.loginSubscription != undefined) {
      this.loginSubscription.unsubscribe()
    }
    if (this.authenticateSubscription != undefined) {
      this.authenticateSubscription.unsubscribe()
    }
  }

  public onSubmit(): void {
    const loginRequest = this.loginForm.value as LoginRequest;
    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (tokenObject: AuthSuccess) => {
        localStorage.setItem('jwtToken', tokenObject.token); //for future connections
        this.authenticateUser(tokenObject.token);
      },
      error: _ => {
        this.onError = true
      },
    }
    );
  }

  public authenticateUser(token: string): void {
    this.authenticateSubscription = this.authService.authenticate(token).subscribe({
      next: (user: UserInformationDTO) => {
        let sessionInformation: SessionInformation = new SessionInformation(
          token, user.id, user.username, user.email, user.themes
        )
        this.sessionService.logIn(sessionInformation);
        this.router.navigate(['/articles']);
      },
      error: _ => {
        localStorage.removeItem('jwtToken');
        this.onError = true
      },
    }
    );
  }

}
