import { Router } from 'express';
import multer from 'multer';

import passport from 'passport';
import config from '../config';

import AuthController from '../controllers/auth.controller';
import PostController from '../controllers/post.controller';
import UserController from '../controllers/user.controller';
import SearchPropertyController from '../controllers/search-property.controller';
import ContactController from '../controllers/contact.controller';

const routes = new Router();

const upload = multer({ dest: 'tmp/uploads/' });
const auth = passport.authenticate('jwt', config.jwtSession);

const CRUDRoutes = (name, controller) => {
  routes.route(`/${name}`).get(auth, controller.find);
  routes.route(`/${name}/:id`).get(auth, controller.findById);
  routes.route(`/${name}`).post(auth, controller.add);
  routes.route(`/${name}/:id`).put(auth, controller.update);
  routes.route(`/${name}/:id`).delete(auth, controller.remove);
};

CRUDRoutes('posts', PostController);
routes.route('/posts/published').get(auth, PostController.findPublished);
routes.route('/posts/upload/:id').post(auth, upload.single('file'), PostController.upload);
routes.route('/posts/upload-condition/:id/:field').post(auth, upload.single('file'), PostController.uploadCondition);

CRUDRoutes('users', UserController);
routes.route('/users/upload/:id').post(auth, upload.single('file'), UserController.upload);
routes.route('/users/upload-avatar/:id').post(auth, upload.single('file'), UserController.uploadAvatar);

routes.route('/signup').post(AuthController.singUp);
routes.route('/signin').post(AuthController.signIn);
routes.route('/facebook-login').post(AuthController.facebookLogin);
routes.route('/search-property').post(SearchPropertyController.search);
routes.route('/contact').post(ContactController.save);

// Protect dashboard route with JWT
routes.get('/user', passport.authenticate('jwt', config.jwtSession), function(req, res) {
  res.send('It worked! User id is: ' + req.user.id + '.');
});

export default routes;
