import { JsonWebTokenJWTProvider } from '@modules/users/providers/JWTProvider/implementations/JsonWebTokenJWTProvider';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const jwtProvider = new JsonWebTokenJWTProvider();

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = await jwtProvider.verify(token);

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
