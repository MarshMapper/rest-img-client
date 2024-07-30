import { IAlbumSummaryDto } from "./i-album-summary-dto";
import { IFileDto } from "./i-file-dto";

export interface IAlbumDto extends IAlbumSummaryDto {
    files: IFileDto[];
}