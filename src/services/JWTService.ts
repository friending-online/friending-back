import jwt from 'jsonwebtoken';
import ErrorStatus from '../utils/ErrorStatus';
import { DecodedJWT } from '../types/jwtType';
export class JWTService {
  static async issue(id: number) {
    const access = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1m',
    });
    const refresh = jwt.sign({ access, id }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });
    return { access, refresh };
  }

  static async verify(access: string) {
    let data;
    jwt.verify(access, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorStatus('토큰이 만료되었습니다', 401);
      }
      data = decoded;
    });
    return data as DecodedJWT;
  }

  static async refreshCheck(access: string, refresh: string) {
    let newTokens;
    jwt.verify(refresh, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorStatus('토큰이 만료되었습니다', 401);
      }
      if ((decoded as any).access != access) {
        throw new ErrorStatus('유효하지 않은 JWT입니다.', 400);
      }
      newTokens = JWTService.issue((decoded as any).id);
    });
    return newTokens;
  }

  static async issueLinkToken(profileId: number) {
    const token = jwt.sign({ id: profileId }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
    return token;
  }

  static async verifyLinkToken(token: string) {
    let data;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorStatus('링크가 만료되었습니다', 401);
      }
      data = decoded;
    });
    return data as DecodedJWT;
  }
}
