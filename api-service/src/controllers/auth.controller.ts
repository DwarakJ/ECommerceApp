// Uncomment these imports to begin using these cool features!

import {TokenService, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {FilterBuilder, repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {
  Credentials,
  CredentialsRequestBody,
  OTPCredentialsRequestBody,
} from '../schema/user-profile';
import {OTPService} from '../services/otp-service';

export class AuthController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/users/login')
  async login(
    @requestBody(OTPCredentialsRequestBody) request: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      new OTPService()
        .verifyOTP(request.otp, request.sessionid)
        .then(async (res: any) => {
          console.log(res.data.Details);
          if (res.data.Details === 'OTP Matched') {
            var filter = new FilterBuilder<User>()
              .where({phone: request.phone})
              .build();
            this.userRepository
              .findOne(filter)
              .then(async (res: any) => {
                if (res) {
                  let user = await this.userService.verifyCredentials(
                    res.phone,
                  );
                  const userProfile = this.userService.convertToUserProfile(
                    user,
                  );
                  const token = await this.jwtService.generateToken(
                    userProfile,
                  );
                  resolve({
                    status: true,
                    result: {token: token, user: user},
                  });
                } else {
                  let user: any = {
                    first_name: request.first_name,
                    last_name: request.last_name,
                    address: request.address,
                    phone: request.phone,
                    email: request.email,
                  };
                  await this.userRepository
                    .create(user)
                    .then(async res => {
                      const userProfile = this.userService.convertToUserProfile(
                        res,
                      );
                      const token = await this.jwtService.generateToken(
                        userProfile,
                      );
                      resolve({
                        status: true,
                        result: {token: token, user: res},
                      });
                    })
                    .catch((err: any) => {
                      console.log(err);
                      resolve(err);
                    });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            resolve(res.data);
          }
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  @post('/users/verify_device', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async verify(
    @requestBody(CredentialsRequestBody) request: Credentials,
  ): Promise<any> {
    var filter = new FilterBuilder<User>()
      .where({phone: request.phone})
      .build();
    const founduser = await this.userRepository.findOne(filter);
    return new Promise((resolve, reject) => {
      new OTPService()
        .sendOTP(request.phone)
        .then((res: any) => {
          resolve({
            status: true,
            sessionid: res.data.Details,
            is_registered: founduser ? true : false,
            phone: request.phone,
          });
        })
        .catch((err: any) => {
          console.log(err);
          resolve({status: false});
        });
    });
  }
}
