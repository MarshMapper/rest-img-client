import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { IAlbumSummaryDto } from '../models/i-album-summary-dto';
import { IAlbumsDto } from '../models/i-albums-dto';
import { IAlbumDto } from '../models/i-album-dto';

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {
  baseUrl: string ='https://rest-img.azurewebsites.net';

  albumsUrl: string = this.baseUrl + '/albums';
  startingFolderWebPath: string = '';

  constructor(private readonly httpClient: HttpClient,
    private readonly httpErrorService: HttpErrorService) { }
  async getAlbums(): Promise<IAlbumsDto> {
    const albums$ = this.httpClient.get<IAlbumsDto>(this.albumsUrl)
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
    return firstValueFrom(albums$);
  };
  getAlbum(albumPath: string): Promise<IAlbumDto> {
    const album$ = this.httpClient.get<IAlbumDto>(`${this.albumsUrl}/${albumPath}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            throw new Error(this.httpErrorService.getFriendlyErrorMessage(error));
          });
        })
      );
    return firstValueFrom(album$);
  }
  getSizedImagePath(album: IAlbumSummaryDto, fileName: string, width: number, format: string = "webp"): string {
    return `${this.baseUrl}${this.startingFolderWebPath}/${album.path}/${fileName}?w=${width}&fmt=${format}`;
  }
}
