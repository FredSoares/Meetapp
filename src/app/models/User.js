import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      /* A virtual value that is not stored in the DB.
      This could for example be useful if you want to provide a default value
      in your model that is returned to the user but not stored in the DB. */
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    },
    {
      sequelize,
    });

    /* A hook that is run before creating or updating a single instance
      this hook will hash the password before store in DB
    */
    this.addHook('beforeSave', async (user) => {
      /* if user provide the password */
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;
