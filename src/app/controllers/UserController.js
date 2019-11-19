import User from '../models/User';

class UserController {
  // method to handle data for the user creation
  async store(req, res) {
    // get user email to verify email already exists
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // if exists return error status 401
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  /* method to update user information */
  async update(req, res) {
    const { email, oldPassword } = req.body;

    /* select user with id */
    const user = await User.findByPk(req.userId);

    /* if email is different the user email, check if the email is already exists */
    if (email !== user.email) {
      // get user email to verify email already exists
      const userExists = await User.findOne({ where: { email } });

      // if exists return error status 401
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    /* verify if the user password is valid if user send oldPassword */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    /* if all is correct update the user */
    const { id, name } = await user.update(req.body);

    /* return user information */
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
