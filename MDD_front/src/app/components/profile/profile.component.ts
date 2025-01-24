import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionInformation } from '../../interfaces/sessionInformation.class';
import { Router } from '@angular/router';
import { UserInformationDTO } from '../../interfaces/userInformationDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router) {
  }
  public onError = false;

  public sessionInformation!: SessionInformation;
  public form!: FormGroup;

  ngOnInit(): void {
    this.sessionInformation = this.sessionService.sessionInformation!;

    this.form = this.fb.group({
      username: [
        this.sessionInformation.username,
        [
          Validators.required,
          Validators.min(2),
        ]
      ],
      email: [
        this.sessionInformation.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
    });
  }

  public onSubmit(): void {
    const request = this.form.value as UserInformationDTO;
    request.id = this.sessionInformation.id;
    this.userService.modifyProfile(request, this.sessionInformation.token).subscribe({
      next: (_: any) => {
        this.sessionInformation.email = request.email;
        this.sessionInformation.username = request.username;
        this.sessionService.logIn(this.sessionInformation); //updating profile in frontend session
      },
      error: _ => {
        this.onError = true
      },
    });
  }

  public onDisconnect(): void {
    this.sessionService.logOut();
  }
}
