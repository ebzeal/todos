import models from '../models';

const { user } = models;
/**
 *
 *
 * @class UserModelQuery
 */
class authQuery {
  /**
   * @param {stirng} email email must be type string
   * @return {object} return user if it exist or null if it doesn't.
   */
  static async findUser(email) {
    try {
      const emailUser = await user.findOne({
        where: { email }
      });
      if (emailUser) {
        return emailUser;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default authQuery;
