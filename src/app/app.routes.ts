import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { PhotoAlbumsComponent } from './components/photo-albums/photo-albums.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';

export const routes: Routes = [
    {
        path: 'albums',
        component: PhotoAlbumsComponent
    },
    {
        path: 'albums/:albumId',
        component: PhotoAlbumComponent
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
        redirectTo: 'albums',
        pathMatch: 'full'
    }
];
