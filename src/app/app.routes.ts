import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { PhotoAlbumsComponent } from './components/photo-albums/photo-albums.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';

export const routes: Routes = [
    {
        path: 'albums',
        component: PhotoAlbumsComponent,
        title: 'Photo Albums'
    },
    {
        path: 'albums/:albumId',
        component: PhotoAlbumComponent,
        title: 'Photo Album'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About'
    },
    {
        path: 'help',
        component: HelpComponent,
        title: 'Help'
    },
    {
        path: '**',
        redirectTo: 'albums',
        pathMatch: 'full'
    }
];
