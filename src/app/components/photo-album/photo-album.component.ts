import { ChangeDetectionStrategy, Component, signal, Signal, WritableSignal } from '@angular/core';
import { IAlbumDto } from '../../models/i-album-dto';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IFileDto } from '../../models/i-file-dto';
import { ActivatedRoute, Router } from '@angular/router';
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
  photos: WritableSignal<IFileDto[]> = signal([]);
  previewWidth: Signal<number> = signal(600);

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly photoAlbumService: PhotoAlbumService) { }
  async ngOnInit() {
    // if not albumId in the route, redirect to albums
    let albumId: string | null = this.route.snapshot.paramMap.get('albumId');
    if (albumId === null) {
      this.router.navigate(['/albums']);
    } else {
      try {
        this.album = await this.photoAlbumService.getAlbum(albumId);
        // trigger UI update
        this.photos.set(this.album.files);
      }
      catch (error: unknown) {
        console.error((error as Error).message);
      }
    }
  }
  // get the path to the preview image which includes resizing it based on the specified density
  getPreviewImagePath(file: IFileDto, density: number = 1): string {
    return this.photoAlbumService.getSizedImagePath(this.album, file.name, this.previewWidth() * density);
  }
}
