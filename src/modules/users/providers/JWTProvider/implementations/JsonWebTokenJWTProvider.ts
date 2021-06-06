import authConfig from '@config/auth';
import { sign, verify } from 'jsonwebtoken';

import { IJWTProvider, ITokenPayload } from '../models/IJWTProvider';

class JsonWebTokenJWTProvider implements IJWTProvider {
  public async generate(subject: string): Promise<string> {
    return sign({}, authConfig.jwt.secret, {
      subject,
    });
  }

  public async verify(token: string): Promise<ITokenPayload> {
    return verify(token, authConfig.jwt.secret) as ITokenPayload;
  }
}

export { JsonWebTokenJWTProvider };
