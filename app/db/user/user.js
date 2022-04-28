import { UserModel } from '../schema/user_schema.js';

export function User() {}
User.prototype.currentUser = function () {
  console.log('Current User');
  console.log(UserModel);
};
User.prototype.putUser = async function (member) {
  console.log('Put User');
  const userInfo = {
    userId: member.user.id,
    userName: member.user.username,
    nickname: member.nickname,
    discriminator: member.user.discriminator,
  };
  await UserModel.create(userInfo);
};
User.prototype.isExist = async function (userId) {
  try {
    return await UserModel.exists({ userId: userId });
  } catch (e) {
    console.log(e.message);
  }
};
