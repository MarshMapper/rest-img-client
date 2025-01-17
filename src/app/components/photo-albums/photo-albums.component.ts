import { OnInit, ChangeDetectionStrategy, Component, signal, Signal, WritableSignal } from '@angular/core';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IAlbumsDto } from '../../models/i-albums-dto';
import { IAlbumSummaryDto } from '../../models/i-album-summary-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({
    selector: 'app-photo-albums',
    imports: [CommonModule, RouterModule],
    templateUrl: './photo-albums.component.html',
    styleUrl: './photo-albums.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoAlbumsComponent implements OnInit {
  thumbnailWidth: WritableSignal<number> = signal(300);
  albums: WritableSignal<IAlbumSummaryDto[]> = signal([]);

  constructor(private readonly photoAlbumService: PhotoAlbumService,
    private readonly progressService: ProgressService
  ) {}
  async ngOnInit() {
    this.progressService.setWorkInProgress(true);
    try {
      // get the available albums
      await this.getAlbums();
    }
    catch (error: unknown) {
      console.error((error as Error).message);
    }
    finally {
      this.progressService.setWorkInProgress(false);
    }
  }
  async getAlbums(): Promise<IAlbumsDto> {
    let albumsDto: IAlbumsDto = (await this.photoAlbumService.getAlbums());

    this.albums.set(albumsDto.albums);
    return albumsDto;
  }
  // get the path to the thumbnail image which includes resizing it based on the specified width
  getThumbnailImagePath(album: IAlbumSummaryDto, width: number): string {
    return this.photoAlbumService.getSizedImagePath(album, album.thumbnail, width);
  }
}
