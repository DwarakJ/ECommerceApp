// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {FilterBuilder, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {UserCredentials} from '../models/user-credentials.model';
import {User} from '../models/user.model';
import {UserCredentialsRepository} from '../repositories/user-credentials.repository';
import {UserRepository} from '../repositories/user.repository';
import {Credentials} from '../schema/user-profile';
import {PasswordHasher} from './hash.password.bcryptjs';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialRepository: UserCredentialsRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';
    const invalidUserError = 'User found, cred not found';

    const foundUser = await this.userRepository.findOne({
      where: {phone: credentials.phone},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    var filter = new FilterBuilder<UserCredentials>()
      .fields('userId')
      .where({userId: foundUser.id})
      .build();

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.first_name) userName = `${user.first_name}`;
    if (user.last_name)
      userName = user.first_name
        ? `${userName} ${user.last_name}`
        : `${user.last_name}`;
    const userProfile = {
      [securityId]: user.userId,
      name: userName,
      roles: user.roles,
    };

    return userProfile;
  }
}
