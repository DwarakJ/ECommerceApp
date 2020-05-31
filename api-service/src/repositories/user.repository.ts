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

// export class UserRepository extends DefaultCrudRepository<
//   User,
//   typeof User.prototype.id,
//   UserRelations
// > {
//   constructor(
//     @inject('datasources.mongo') dataSource: MongoDataSource,
//   ) {
//     super(User, dataSource);
//   }
// }

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: juggler.DataSource,
  ) {
    super(User, dataSource);
  }
/* 
  async findCredentials(
    userId: string,
  ): Promise<UserCredentials | undefined> {
    try {
      console.log(userId)
      
      var res = await this.userCredentials("5ecb7cb12616199e87fefc04").get()
      return res;
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        console.log(err)
        return undefined;
      }
      throw err;
    }
  }
 */


/*  
    constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    ) { super(User,dataSource)}

    async createCredential(userId: string, password: string): Promise<UserCredentials>{
    try{

      return await this.create
      //userCredentialsRepository(userId).create(userId)
    }
    catch (err)
    {
      throw err;
    }
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<any> {
    try {
      var filter = new FilterBuilder<UserCredentials>().where({userId:userId}).build();
      console.log("User: "+userId+" "+await this.userCredentialsRepository.find(filter))
      return await this.userCredentialsRepository.find(filter)
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  } */
}