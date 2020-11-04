import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
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

  @get('/users/me')
  @authenticate('jwt')
  async getCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ) {
    console.log('currentuser', currentUserProfile);
    return this.userRepository.findById(currentUserProfile[securityId]);
  }
}
