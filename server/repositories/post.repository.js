import Post from '../models/post';
import AbstractRepository from './abstract.repository';

class PostRepository extends AbstractRepository {

  findByIdPreExec(q) {
    return q.populate('user');
  }

  findPaginatedPreExec(q) {
    return q.populate('user');
  }

}

const repository = new PostRepository(Post);

export default repository;
