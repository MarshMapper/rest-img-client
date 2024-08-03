import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAlbumsComponent } from './photo-albums.component';
import { HttpClientModule } from '@angular/common/http';

describe('PhotoAlbumsComponent', () => {
  let component: PhotoAlbumsComponent;
  let fixture: ComponentFixture<PhotoAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoAlbumsComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
