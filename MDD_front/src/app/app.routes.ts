import { Routes } from '@angular/router';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { ArticlesComponent } from './components/articles/articles.component';
import { ThemesComponent } from './components/themes/themes.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [


    {
        path: 'auth',
        canActivate: [UnauthGuard],
        loadChildren: () => import('./components/auth/auth-routing.routes').then(m => m.routes)
    },
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    {
        path: 'articles',
        canActivate: [AuthGuard],
        component: ArticlesComponent
    },
    {
        path: 'themes',
        canActivate: [AuthGuard],
        component: ThemesComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
    },
];
