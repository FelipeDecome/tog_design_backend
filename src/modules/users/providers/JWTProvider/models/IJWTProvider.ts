interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IJWTProvider {
  generate(subject: string): Promise<string>;
  verify(token: string): Promise<ITokenPayload>;
}

export { IJWTProvider, ITokenPayload };
