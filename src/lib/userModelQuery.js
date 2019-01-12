import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authQuery from '../lib/authModelQuery';

const User = {
  /**
   * Register A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  // constructor() {
  //   const hashed = bcrypt.hashSync(req.body.password, 8);
  // },

  async signUp(req, res) {
    const checkUser = 'SELECT * FROM users WHERE userEmail=$1';
    const emailVal = [req.body.userEmail];
    const hashed = bcrypt.hashSync(req.body.password, 8);
    const text = `INSERT INTO
    users(userName, userEmail, userPriviledge, password)
    VALUES($1, $2, $3, $4)
    returning *`;
    const values = [req.body.userName, req.body.userEmail, req.body.userPriviledge, hashed];

    try {
      const { rows } = await db.query(checkUser, emailVal);
      if (rows[0]) return res.status(400).json({ message: 'This user already exists' });
      const newUser = await db.query(text, values); // this returns an object
      return res.status(201).json(newUser.rows[0]);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  },

  /**
   * Login a user
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async logIn(req, res) {
    const values = [req.body.userEmail];
    const findUser = 'SELECT * FROM users WHERE userEmail=$1';
    try {
      const { rows } = await db.query(findUser, values);

      if (!rows[0]) return res.status(404).json({ message: 'user not found' });

      const passwordTrue = bcrypt.compareSync(req.body.password, rows[0].password);
      if (!passwordTrue) return res.status(401).json({ auth: false, token: null, message: 'Password is wrong' });

      const payload = {
        id: rows[0].id,
        userName: rows[0].username,
        userPriviledge: rows[0].userpriviledge
      };
      // Create JWT Payload
      // Sign Token
      jwt.sign(payload, keys.JWT_SECRET, { expiresIn: 10800 }, (err, token) => {
        res.json({
          token: `${token}`,
          userName: `${rows[0].username}`,
          userId: `${rows[0].id}`,
          userPriviledge: `${rows[0].userpriviledge}`
        });
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  userAccess(req, res) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).send({
          // auth: false, message: err.message, //Give me a readable message
          auth: false,
          message: 'Sorry, you do not have access to this page. Contact Admin'
        });
      }
      res.json(decoded);
    });
  }
};

export default User;
