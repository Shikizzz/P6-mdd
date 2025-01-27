import { Component, Input } from '@angular/core';
import { Theme } from '../interfaces/theme.class';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
import { ThemeProps } from '../interfaces/themeProps.class';


@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  @Input() themeProps!: ThemeProps;
  private onError: boolean = false;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
  ) { };

  public onSubscribe(): void {
    this.userService.themeSubscribe(this.themeProps.theme.themeId).subscribe({
      next: (_: any) => {
        this.sessionService.addTheme(this.themeProps.theme);
      },
      error: _ => {
        this.onError = true
      },
    });
  }

  public onUnsubscribe(): void {
    this.userService.themeUnsubscribe(this.themeProps.theme.themeId).subscribe({
      next: (_: any) => {
        this.sessionService.addTheme(this.themeProps.theme);
      },
      error: _ => {
        this.onError = true
      },
    });
  }

}
