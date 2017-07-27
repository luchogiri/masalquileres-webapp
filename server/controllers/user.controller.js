import AbstractController from './abstract.controller';
import UserRepository from '../repositories/user.repository';
import S3Service from '../services/S3';

class UserController extends AbstractController {

  upload = (req, res) => {

    S3Service.upload(req.file, (data, err) => {
      if(err) {
        res.sendStatus(500);
      } else {
        UserRepository.findById(req.params.id, (err, user) => {
          user.document_image = data.url;
          user.save((err, updated) => {
            if(err) {
              res.sendStatus(500);
            } else {
              res.status(200).send(updated);
            }
          });
        });
      }
    });

  };

  uploadAvatar = (req, res) => {

    S3Service.upload(req.file, (data, err) => {
      if(err) {
        res.sendStatus(500);
      } else {
        UserRepository.findById(req.params.id, (err, user) => {
          user.avatar = data.url;
          user.save((err, updated) => {
            if(err) {
              res.sendStatus(500);
            } else {
              res.status(200).send(updated);
            }
          });
        });
      }
    });

  };

}

const controller = new UserController(UserRepository);

export default controller;
