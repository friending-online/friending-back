import { Request, Response } from 'express';
import { CallbackService } from '../services/CallbackService';
import { LoginService } from '../services/LoginService';
import ErrorStatus from '../utils/ErrorStatus';
import { callbackValidation } from '../DTO/validations/callback';

export class CallbackController {
  static async post(req: Request, res: Response) {
    const callbackDTO = await callbackValidation(req);
    const { accessToken, platform } = callbackDTO;
    if (platform === 'google') {
      const data = await CallbackService.google(accessToken);
      const tokens = await LoginService.login(data);
      return res.json(tokens);
    }
    if (platform === 'kakao') {
      const data = await CallbackService.kakao(accessToken);
      const tokens = await LoginService.login(data.kakao_account);
      return res.json(tokens);
    }
    if (platform === 'naver') {
    }
    throw new ErrorStatus('잘못된 요청입니다', 400);
  }
}
