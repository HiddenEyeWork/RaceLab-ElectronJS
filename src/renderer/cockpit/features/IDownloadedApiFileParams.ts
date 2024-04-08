export interface IDownloadedApiFileParams {
  downloadKey: string;
}

export interface IDownloadApiFileParams {
  downloadKey: string;
  accessToken: string;

  url: string;
  destinationFolder: string;
}
