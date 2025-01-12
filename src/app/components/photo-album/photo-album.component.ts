import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAlbumDto } from '../../models/i-album-dto';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IFileDto } from '../../models/i-file-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-album',
    imports: [CommonModule],
    templateUrl: './photo-album.component.html',
    styleUrl: './photo-album.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoAlbumComponent {
  album: IAlbumDto = { 
    description: '', name: '', path: '', thumbnail: '', files: [] 
  };
  photos$: Subject<IFileDto[]> = new Subject<IFileDto[]>();
  previewWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(600);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoAlbumService: PhotoAlbumService) { }
  ngOnInit() {
    // if not albumId in the route, redirect to albums
    let albumId: string | null = this.route.snapshot.paramMap.get('albumId');
    if (albumId === null) {
      this.router.navigate(['/albums']);
    } else {
      // currently it's requrired to get the albums first, then get the specific album
      // we need.
      this.photoAlbumService.getAlbums().subscribe((albums) => {
        this.photoAlbumService.getAlbum(albumId).subscribe({
          next: (album: IAlbumDto) => {
            this.album = album;
            // trigger UI update
            this.photos$.next(album.files);
          },
          error: (error: Error) => {
            console.error(error.message);
          }
        });
      });
    }
  }
  // get the path to the preview image which includes resizing it based on the specified density
  getPreviewImagePath(file: IFileDto, density: number = 1): string {
    return this.photoAlbumService.getSizedImagePath(this.album, file.name, this.previewWidth$.value * density);
  }
}
