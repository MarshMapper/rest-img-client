import { IAlbumSummaryDto } from './i-album-summary-dto';

export interface IAlbumsDto {
    startingFolderWebPath: string;
    albums: IAlbumSummaryDto[];
}
