import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Theme } from './interfaces/theme.class';
import { ThemeComponent } from './theme/theme.component';
import { ThemesService } from '../../services/themes.service';
import { SessionService } from '../../services/session.service';
import { ThemeProps } from './interfaces/themeProps.class';


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

  public themesProps: ThemeProps[] = new Array();

  constructor(
    public sessionService: SessionService,
    public themesService: ThemesService,
  ) { }

  ngOnInit(): void {
    this.getThemes();
  }

  private getThemes(): void {
    this.themesService.getThemes().subscribe({
      next: (themes: Theme[]) => {
        this.themesProps = themes.map((theme) => {
          return this.themeToThemeProps(theme, this.customIncludes(this.sessionService.sessionInformation!.themes, theme))  //Out of the array if already subscribed by the user
        })
      },
      // TODO add ERROR
    });
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
