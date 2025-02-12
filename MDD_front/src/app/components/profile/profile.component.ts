import { Component, computed, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionInformation } from '../auth/interfaces/sessionInformation.class';
import { UserService } from '../../services/user.service';
import { Theme } from '../themes/interfaces/theme.class';
import { ThemeComponent } from '../themes/theme/theme.component';
import { ThemeProps } from '../themes/interfaces/themeProps.class';
import { ModifyRequest } from './interfaces/modifyRequest.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    ThemeComponent,
    MatSnackBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService,
    private matSnackBar: MatSnackBar) { }

  public onError = false;
  public subscription: Subscription | undefined;
  public _sessionInformation = signal<SessionInformation | undefined>(undefined);
  public form!: FormGroup;

  public _themesProps: Signal<ThemeProps[]> = signal([]);

  ngOnInit(): void {
    this._sessionInformation = this.sessionService._sessionInformation;
    this._themesProps = computed(() =>
      this.themesToThemesProps(this._sessionInformation()!.themes)
    )

    this.form = this.fb.group({
      username: [
        this._sessionInformation()!.username,
        [
          Validators.required,
          Validators.min(2),
        ]
      ],
      email: [
        this._sessionInformation()!.email,
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

  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe()
    }
  }

  public onSubmit(): void {
    const request = this.form.value as ModifyRequest;
    request.id = this._sessionInformation()!.id;
    this.subscription = this.userService.modifyProfile(request).subscribe({
      next: () => {
        this._sessionInformation()!.email = request.email;
        this._sessionInformation()!.username = request.username;
        this.sessionService.logIn(this._sessionInformation()!); //updating profile in frontend session
        this.matSnackBar.open("Modification successfull !", 'Close', { duration: 3000 });
      },
      error: (error: any) => {
        this.onError = true;
        console.log(error);
      },
    });
  }

  public onDisconnect(): void {
    this.sessionService.logOut();
  }

  private themesToThemesProps(themes: Theme[]): ThemeProps[] {
    let themesProps: ThemeProps[] = themes.map(theme => {
      return new ThemeProps(theme, true)
    })
    return themesProps;
  }

}
