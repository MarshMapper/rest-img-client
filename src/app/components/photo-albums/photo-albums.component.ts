import { Component } from '@angular/core';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IAlbumsDto } from '../../models/i-albums-dto';
import { IAlbumSummaryDto } from '../../models/i-album-summary-dto';

@Component({
  selector: 'app-photo-albums',
  standalone: true,
  imports: [],
  templateUrl: './photo-albums.component.html',
  styleUrl: './photo-albums.component.scss'
})
export class PhotoAlbumsComponent {
  albums: IAlbumsDto = { startingFolderWebPath: '', albums: [] };

  constructor(private photoAlbumService: PhotoAlbumService) { }
  ngOnInit() {
    this.photoAlbumService.getAlbums().subscribe({
      next: (albums: IAlbumsDto) => {
        this.albums = albums;
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }
  getThumbnailImagePath(albums: IAlbumsDto, album: IAlbumSummaryDto): string {
    return this.photoAlbumService.getThumbnailImagePath(albums, album);
  }
}
