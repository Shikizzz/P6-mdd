import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { SessionInformation } from '../auth/interfaces/sessionInformation.class';
import { UserInformationDTO } from '../auth/interfaces/userInformationDTO';
import { UserService } from '../../services/user.service';
import { Theme } from '../themes/interfaces/theme.class';
import { ThemeComponent } from '../themes/theme/theme.component';
import { ThemeProps } from '../themes/interfaces/themeProps.class';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    ThemeComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService,) { }

  public onError = false;

  public sessionInformationSig = signal<SessionInformation | undefined>(undefined);
  public form!: FormGroup;

  public themesProps!: ThemeProps[];

  ngOnInit(): void {
    this.sessionInformationSig = this.sessionService.sessionInformationSig;
    this.themesProps = this.themesToThemesProps(this.sessionInformationSig()!.themes);

    this.form = this.fb.group({
      username: [
        this.sessionInformationSig()!.username,
        [
          Validators.required,
          Validators.min(2),
        ]
      ],
      email: [
        this.sessionInformationSig()!.email,
        [
          Validators.required,
          Validators.email
        ]
      ],
    });
  }

  public onSubmit(): void {
    const request = this.form.value as UserInformationDTO;
    request.id = this.sessionInformationSig()!.id;
    this.userService.modifyProfile(request).subscribe({
      next: (_: any) => {
        this.sessionInformationSig()!.email = request.email;
        this.sessionInformationSig()!.username = request.username;
        this.sessionService.logIn(this.sessionInformationSig()!); //updating profile in frontend session
      },
      error: _ => {
        this.onError = true
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
