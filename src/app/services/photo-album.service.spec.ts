import { TestBed } from '@angular/core/testing';

import { PhotoAlbumService } from './photo-album.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PhotoAlbumService', () => {
  let service: PhotoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(PhotoAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
