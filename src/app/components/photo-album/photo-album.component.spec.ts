import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoAlbumComponent } from './photo-album.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PhotoAlbumComponent', () => {
  let component: PhotoAlbumComponent;
  let fixture: ComponentFixture<PhotoAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PhotoAlbumComponent, RouterModule.forRoot([])],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
