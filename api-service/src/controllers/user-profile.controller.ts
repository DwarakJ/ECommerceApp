import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Filter, model, property, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  requestBody,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {User} from '../models';
import {
  DeliveryExecutiveRepository,
  UserRepository,
  VendorRepository,
} from '../repositories';
import {Credentials} from '../schema/user-profile';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {SECURITY_SPEC} from '../utils/security-spec';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserProfileController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
    @repository(DeliveryExecutiveRepository)
    public deliveryExecutiveRepository: DeliveryExecutiveRepository,
  ) {}

  @get('/users', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find();
  }

  @get('/users/{userId}')
  @authenticate('jwt')
  async findById(
    @param.path.string('userId') id: any,
    @inject(SecurityBindings.USER)
    currentuser: UserProfile,
  ) {
    console.log('currentuser', currentuser);
    return this.userRepository.findById(currentuser[securityId]);
  }

  @patch('/users', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .updateById(id, user)
        .then(res => {
          resolve({status: true, result: res});
        })
        .catch(err => {
          console.error(err);
          resolve({status: false});
        });
    });
  }

  @del('/users/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @get('/users/me')
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ) {
    console.log('currentuser', currentUserProfile);
    return this.userRepository.findById(currentUserProfile[securityId]);
  }
}
