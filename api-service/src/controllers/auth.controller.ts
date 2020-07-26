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
  OTPVerificationRequestBody,
  UserRegistrationRequestBody,
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

  @post('/users/register')
  async registerUser(
    @requestBody(UserRegistrationRequestBody) request: any,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      var filter = new FilterBuilder<User>()
        .where({phone: request.phone})
        .build();
      this.userRepository
        .findOne(filter)
        .then(async (res: any) => {
          if (res) {
            let user = await this.userService.verifyCredentials(res.phone);
            const userProfile = this.userService.convertToUserProfile(user);
            const token = await this.jwtService.generateToken(userProfile);
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
                const userProfile = this.userService.convertToUserProfile(res);
                const token = await this.jwtService.generateToken(userProfile);
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
          resolve({
            status: false,
            message: 'Registration failed, try again.',
          });
        });
    });
  }

  @post('/users/sendotp')
  async verifyPhone(
    @requestBody(CredentialsRequestBody) request: Credentials,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      new OTPService()
        .sendOTP(request.phone)
        .then((res: any) => {
          console.log(res);
          resolve({
            status: true,
            result: {sessionid: res.data.Details, phone: request.phone},
          });
        })
        .catch((err: any) => {
          console.log(err);
          resolve({
            status: false,
            message:
              'Unable to send OTP at this moment. Please try with a valid mobile number',
          });
        });
    });
  }

  @post('/users/verify_otp')
  async verifyOTP(
    @requestBody(OTPVerificationRequestBody) request: any,
  ): Promise<any> {
    var filter = new FilterBuilder<User>()
      .where({phone: request.phone})
      .build();
    const founduser = await this.userRepository.findOne(filter);
    return new Promise((resolve, reject) => {
      new OTPService()
        .verifyOTP(request.otp, request.sessionid)
        .then((res: any) => {
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
                    result: {
                      token: token,
                      is_registered: true,
                    },
                  });
                } else {
                  resolve({
                    status: true,
                    result: {is_registered: false},
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            resolve(res.data);
          }
        });
    });
  }
}
