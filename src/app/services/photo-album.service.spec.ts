import { TestBed } from '@angular/core/testing';

import { PhotoAlbumService } from './photo-album.service';

describe('PhotoAlbumService', () => {
  let service: PhotoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
