import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IAlbumSummaryDto } from '../models/i-album-summary-dto';

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {
  baseUrl: string = 'https://rest-img.azurewebsites.net';

  albumsUrl: string = this.baseUrl + '/albums';
  startingFolderWebPath: string = '';

  constructor(private readonly httpClient: HttpClient,
    private readonly httpErrorService: HttpErrorService) { }
  getAlbums(): Observable<any> {
    return this.httpClient.get(this.albumsUrl)
      .pipe(
        tap((albums: any) => {
          // save so available for other methods
          this.startingFolderWebPath = albums.startingFolderWebPath;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            throw new Error(this.httpErrorService.getFriendlyErrorMessage(error));
          });
        })
      );
  };
  getAlbum(albumPath: string): Observable<any> {
    return this.httpClient.get(`${this.albumsUrl}/${albumPath}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            throw new Error(this.httpErrorService.getFriendlyErrorMessage(error));
          });
        })
      );
  }
  getSizedImagePath(album: IAlbumSummaryDto, fileName: string, width: number, format: string = "webp"): string {
    return `${this.baseUrl}${this.startingFolderWebPath}/${album.path}/${fileName}?w=${width}&fmt=${format}`;
  }
}
