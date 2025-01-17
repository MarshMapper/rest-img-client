import { OnInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IAlbumsDto } from '../../models/i-albums-dto';
import { IAlbumSummaryDto } from '../../models/i-album-summary-dto';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
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
  albums$: Subject<IAlbumSummaryDto[]> = new Subject<IAlbumSummaryDto[]>();
  thumbnailWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(300);
  albums: IAlbumsDto = { startingFolderWebPath: '', albums: [] };

  constructor(private readonly photoAlbumService: PhotoAlbumService,
    private readonly progressService: ProgressService
  ) {}
  async ngOnInit(): Promise<void> {
    this.progressService.setWorkInProgress(true);
    try
    {
      // get the available albums
      await this.getAlbums();
    }
    catch (error: unknown)
    {
      console.error((error as Error).message);
    }
    finally
    {
      this.progressService.setWorkInProgress(false);
    }
  }
  async getAlbums(): Promise<IAlbumsDto> {
    const albums = await this.photoAlbumService.getAlbums();
    this.albums = <IAlbumsDto>albums;
    // trigger UI update
    this.albums$.next(albums.albums);
    return albums;
  }
  // get the path to the thumbnail image which includes resizing it based on the specified width
  getThumbnailImagePath(albums: IAlbumsDto, album: IAlbumSummaryDto, width: number): string {
    return this.photoAlbumService.getSizedImagePath(album, album.thumbnail, width);
  }
}
