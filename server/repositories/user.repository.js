import User from '../models/user';
import AbstractRepository from './abstract.repository';

class UserRepository extends AbstractRepository {

}

const repository = new AbstractRepository(User);

export default repository;
