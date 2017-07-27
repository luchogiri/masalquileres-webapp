import AbstractController from './abstract.controller';
import PostRepository from '../repositories/post.repository';
import S3Service from '../services/S3';

class PostController extends AbstractController {

  findPublished = (req, res) => {
    this.find({ ...req })
  };

  upload = (req, res) => {

    S3Service.upload(req.file, (data, err) => {
      if(err) {
        res.sendStatus(500);
      } else {
        PostRepository.findById(req.params.id, (err, post) => {
          post.uploads.push({
            ...req.file,
            url: data.url
          });
          post.save((err, updated) => {
            res.status(200).send(updated);
          });
        });
      }
    });

  };

  uploadCondition = (req, res) => {

    S3Service.upload(req.file, (data, err) => {
      if(err) {
        res.sendStatus(500);
      } else {
        PostRepository.findById(req.params.id, (err, post) => {
          post[req.params.field] = data.url;
          post.save((err, updated) => {
            res.status(200).send(updated);
          });
        });
      }
    });

  };


}

const controller = new PostController(PostRepository);

export default controller;
