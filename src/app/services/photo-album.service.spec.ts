import { TestBed } from '@angular/core/testing';

import { PhotoAlbumService } from './photo-album.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PhotoAlbumService', () => {
  let service: PhotoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterModule.forRoot([])]
    });
    service = TestBed.inject(PhotoAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
