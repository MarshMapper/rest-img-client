import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IAlbumsDto } from '../../models/i-albums-dto';
import { IAlbumSummaryDto } from '../../models/i-album-summary-dto';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photo-albums',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './photo-albums.component.html',
  styleUrl: './photo-albums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoAlbumsComponent {
  albums$: Subject<IAlbumSummaryDto[]> = new Subject<IAlbumSummaryDto[]>();
  albums: IAlbumsDto = { startingFolderWebPath: '', albums: [] };

  constructor(private photoAlbumService: PhotoAlbumService) { }
  ngOnInit() {
    this.photoAlbumService.getAlbums().subscribe({
      next: (albums: IAlbumsDto) => {
        this.albums = albums;
        this.albums$.next(albums.albums);
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
