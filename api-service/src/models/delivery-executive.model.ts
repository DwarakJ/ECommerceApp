import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})
export class DeliveryExecutive extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
    required: true,
  })
  fname: string;

  @property({
    type: 'string',
    required: true,
  })
  lname: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  executive_code: string;

  @property({
    type: 'string',
    required: false,
  })
  id_proof: string;

  constructor(data?: Partial<DeliveryExecutive>) {
    super(data);
  }
}

export interface DeliveryExecutiveRelations {
  // describe navigational properties here
}

export type DeliveryExecutiveWithRelations = DeliveryExecutive &
  DeliveryExecutiveRelations;
