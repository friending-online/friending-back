import FriendDAO from '../DAO/FriendDAO';
import UserDAO from '../DAO/UserDAO';
import ErrorStatus from '../utils/ErrorStatus';

export class FriendService {
  static async add(profileId: number, subProfileId: number) {
    await FriendDAO.addFriend(profileId, subProfileId);
  }

  static async delete(profileId: number, subProfileId: number) {
    await FriendDAO.deleteFriend(profileId, subProfileId);
  }

  static async show(profileId: number) {
    const user = await FriendDAO.getFriendList(profileId);
    return user.friends;
  }
}
