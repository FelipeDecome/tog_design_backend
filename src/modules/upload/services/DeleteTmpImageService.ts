import { IStorageProvider } from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  filename: string;
}

@injectable()
class DeleteTmpImageService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ filename }: IRequest): Promise<void> {
    return this.storageProvider.deleteFile(filename, true);
  }
}

export { DeleteTmpImageService };
