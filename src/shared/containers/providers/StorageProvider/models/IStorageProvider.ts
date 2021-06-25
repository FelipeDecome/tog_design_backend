interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string, is_temp?: boolean): Promise<void>;
}

export { IStorageProvider };
