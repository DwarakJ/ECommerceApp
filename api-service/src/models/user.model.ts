import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})

export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'date',
    required: false,
  })
  date_registered: string;

  @property({
    type: 'string',
    required: false,
  })
  display_picture: string;

  @property({
    type: 'string',
  })
  fname?: string;

  @property({
    type: 'string',
  })
  lname?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile_number: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  pincode?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

//  @hasOne(() => UserCredentials, {keyTo: 'userId'})
//   userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
