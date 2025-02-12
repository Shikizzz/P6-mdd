import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatIconModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private sessionService: SessionService
  ) { }

  public isLogged!: boolean;

  public menuIsClicked: boolean = false;

  ngOnInit(): void {
    this.isLogged = this.sessionService.isLogged;
  }

  public onClickMenu(): void {
    this.menuIsClicked = !this.menuIsClicked;
  }

}
