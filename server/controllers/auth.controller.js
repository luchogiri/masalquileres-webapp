import jwt from 'jwt-simple';
import cfg from '../config.js';
import UserRepository from '../repositories/user.repository';

class AuthController {

  returnUserToken = (user, res) => {
    const payload = {
      id: user._id,
      email: user.email
    };
    const token = jwt.encode(payload, cfg.jwtSecret);
    const plainUser = user.toObject();
    delete plainUser.password;
    res.json({
      token: 'JWT ' + token,
      user: plainUser
    });
  };

  signUpBasic = (req, res) => {
    UserRepository.add(req.body, (err, user) => {
      if(err && err.code === 11000) {
        res.status(400).send({
          msg: 'The email already exists'
        });
      } else if (err) {
        res.status(500).send(err);
      } else {
        this.returnUserToken(user, res)
      }
    });
  };

  singUp = (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        msg: 'Email is required'
      });
    } else {
      this.signUpBasic(req, res);
    }
  };

  signInBasic = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    UserRepository.findOne({ email }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (user) {
          if(password) {
            user.comparePassword(password, (err, isMatch) => {
              if (isMatch && !err) {
                this.returnUserToken(user, res)
              } else {
                res.status(403).send({
                  msg: 'Password does not match'
                });
              }
            });
          } else {
            this.returnUserToken(user, res);
          }
        } else {
          res.status(403).send({
            msg: 'User does not exist'
          });
        }
      }
    });
  };

  signIn = (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        msg: 'Email and password are required'
      });
    } else {
      this.signInBasic(req, res);
    }
  };

  facebookLogin = (req, res) => {
    UserRepository.findOne({ email: req.body.email }, (err, user) => {
      if(!user) {
        this.signUpBasic(req, res);
      } else {
        this.signInBasic(req, res);
      }
    });
  };

}
const controller = new AuthController();

export default controller;
