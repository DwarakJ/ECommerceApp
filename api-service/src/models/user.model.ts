import {Entity, model, property} from '@loopback/repository';

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
  first_name?: string;

  @property({
    type: 'string',
  })
  last_name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  pincode?: string;

  @property({
    type: 'string',
    default: 'user',
  })
  roles?: string;

  @property({
    type: 'string',
    required: true,
    defaultFn: 'guid',
    id: true,
  })
  userId: string;

  @property({
    type: 'boolean',
    default: false,
  })
  is_registered: boolean;

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
