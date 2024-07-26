import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { PhotoAlbumsComponent } from './components/photo-albums/photo-albums.component';

export const routes: Routes = [
    {
        path: 'photos',
        component: PhotoAlbumsComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'help',
        component: HelpComponent
    },
    {
        path: '**',
        redirectTo: 'photos',
        pathMatch: 'full'
    }
];
