import { OnInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IAlbumsDto } from '../../models/i-albums-dto';
import { IAlbumSummaryDto } from '../../models/i-album-summary-dto';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photo-albums',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './photo-albums.component.html',
  styleUrl: './photo-albums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoAlbumsComponent implements OnInit {
  albums$: Subject<IAlbumSummaryDto[]> = new Subject<IAlbumSummaryDto[]>();
  thumbnailWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(300);
  albums: IAlbumsDto = { startingFolderWebPath: '', albums: [] };

  constructor(private photoAlbumService: PhotoAlbumService) {}
  ngOnInit(): void {
    // get the available albums
    this.photoAlbumService.getAlbums().subscribe({
      next: (albums: IAlbumsDto) => {
        this.albums = albums;
        // trigger UI update
        this.albums$.next(albums.albums);
      },
      error: (error: Error) => {
        console.error(error.message);
      }
    });
  }
  // get the path to the thumbnail image which includes resizing it based on the specified width
  getThumbnailImagePath(albums: IAlbumsDto, album: IAlbumSummaryDto, width: number): string {
    return this.photoAlbumService.getSizedImagePath(album, album.thumbnail, width);
  }
}
