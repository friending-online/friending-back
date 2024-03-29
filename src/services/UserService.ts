import UserDAO from '../DAO/UserDAO';
import { FCMTokenDTO } from '../DTO/FCMTokenDTO';
import { UpdateData } from '../types/profileData';
export class UserService {
  static async findAllProfile(id: number) {
    return (await UserDAO.getUserProfiles(id)).profiles;
  }

  static async update(updateData: UpdateData) {
    await UserDAO.update(updateData);
  }

  static async registerfcmToken(dto: FCMTokenDTO) {
    const { id, token } = dto;
    const user = await UserDAO.getUser(id);
    user.fcmToken = token;
    await UserDAO.save(user);
  }
}
