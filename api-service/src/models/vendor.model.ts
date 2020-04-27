import {Entity, model, property} from '@loopback/repository';

@model()
export class Vendor extends Entity {
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
    type: 'date',
    required: false,
  })
  contract_expiry_date: string;

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
    required: true,
  })
  lname: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  mobile: string;

  @property({
    type: 'string',
  })
  license_number?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}

export interface VendorRelations {
  // describe navigational properties here
}

export type VendorWithRelations = Vendor & VendorRelations;
