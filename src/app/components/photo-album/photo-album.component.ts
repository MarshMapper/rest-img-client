import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAlbumDto } from '../../models/i-album-dto';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { IFileDto } from '../../models/i-file-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-album',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoAlbumComponent {
  album: IAlbumDto = { 
    description: '', name: '', path: '', thumbnail: '', files: [] 
  };
  photos$: Subject<IFileDto[]> = new Subject<IFileDto[]>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoAlbumService: PhotoAlbumService) { }
  ngOnInit() {
    let albumId: string | null = this.route.snapshot.paramMap.get('albumId');
    if (albumId === null) {
      this.router.navigate(['/albums']);
    } else {
      this.photoAlbumService.getAlbums().subscribe((albums) => {
        this.photoAlbumService.getAlbum(albumId).subscribe({
          next: (album: IAlbumDto) => {
            this.album = album;
            this.photos$.next(album.files);
          },
          error: (error: Error) => {
            console.error(error.message);
          }
        });
      });
    }
  }
  getPreviewImagePath(file: IFileDto, density: number = 1): string {
    return this.photoAlbumService.getSizedImagePath(this.album, file.name, 600 * density);
  }
}
