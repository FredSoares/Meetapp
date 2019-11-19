import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  // method to handle data for the user creation
  async store(req, res) {
    /* schema for input validation */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    /* validate if requisition is correct as the schema */
    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
    /* schema for input validation */
    const schema = Yup.object().shape(
      {
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
        confirmPassword: Yup.string()
          .when('password', (password, field) => (password ? field.required()
            .oneOf([Yup.ref('password')]) : field)),
      },
    );

    // verificar se o schema está valido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
