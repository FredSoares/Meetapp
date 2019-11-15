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
}

export default new UserController();
