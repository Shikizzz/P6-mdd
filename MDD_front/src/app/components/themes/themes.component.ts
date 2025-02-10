import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Theme } from './interfaces/theme.class';
import { ThemeComponent } from './theme/theme.component';
import { SessionService } from '../../services/session.service';
import { ThemeProps } from './interfaces/themeProps.class';
import { map, Observable, tap } from 'rxjs';
import { SessionInformation } from '../auth/interfaces/sessionInformation.class';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-themes',
  standalone: true,
  imports:
    [HeaderComponent,
      ThemeComponent
    ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnInit {

  private sessionService: SessionService = inject(SessionService)
  private themeService: ThemeService = inject(ThemeService)

  private sessionInformationSig: Signal<SessionInformation | undefined> = this.sessionService.sessionInformation;
  private themes$: Observable<Theme[]> = this.themeService.getThemes();
  private themes!: Theme[];


  public themesPropsSig: Signal<ThemeProps[]> = signal([]);


  ngOnInit(): void {
    this.themes$.subscribe(themes => {
      this.themes = themes
      this.initThemesPropsSig();
    })
  }

  private initThemesPropsSig(): void {
    this.themesPropsSig = computed(() =>
      this.themes.map(
        (theme) => {
          console.log("theme is " + theme)
          return this.themeToThemeProps(theme, this.customIncludes(this.sessionService.sessionInformationSig()!.themes, theme))  //Out of the array if already subscribed by the user
        }
      )
    )
  }

  private equalityCheck(theme1: any, theme2: any) {
    const keys1 = Object.keys(theme1);
    const keys2 = Object.keys(theme2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (theme1[key] !== theme2[key]) {
        return false;
      }
    }
    return true;
  }

  private customIncludes(themes: Theme[], theme: Theme): boolean {
    let bool: boolean = false;
    themes.forEach(t => {
      if (this.equalityCheck(t, theme)) {
        bool = true
      }
    })
    return bool;
  }

  private themeToThemeProps(theme: Theme, isSubscribed: boolean): ThemeProps {
    return new ThemeProps(theme, isSubscribed)
  }

}
