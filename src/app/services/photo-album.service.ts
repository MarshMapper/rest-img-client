import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IAlbumSummaryDto } from '../models/i-album-summary-dto';
import { IAlbumsDto } from '../models/i-albums-dto';

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {
  baseUrl: string = 'https://rest-img.azurewebsites.net';
  albumsUrl: string = this.baseUrl + '/albums';

  constructor(private httpClient: HttpClient,
    private httpErrorService: HttpErrorService) { }
  getAlbums(): Observable<any> {
    return this.httpClient.get(this.albumsUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            throw new Error(this.httpErrorService.getFriendlyErrorMessage(error));
          });
        })
      );
    };
  getThumbnailImagePath(albums: IAlbumsDto, album: IAlbumSummaryDto): string {
    // TODO parameterize the width of the thumbnail
    return `${this.baseUrl}/${albums.startingFolderWebPath}/${album.path}/${album.thumbnail}?w=300`;
  }
}
