import {User, UserRelations} from '../models';
import {UserCredentials} from '../models/user-credentials.model';
import {MongoDataSource} from '../datasources';
import {UserCredentialsRepository} from './user-credentials.repository';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  juggler,
  repository,
  FilterBuilder,
} from '@loopback/repository';
import {Getter, inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.mongo') dataSource: juggler.DataSource) {
    super(User, dataSource);
  }
}
