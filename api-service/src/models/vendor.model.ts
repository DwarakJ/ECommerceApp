import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Vendor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => User)
  vendorId: string;

  @property({
    type: 'date',
    required: false,
  })
  contract_expiry_date?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
  })
  license_number?: string;

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}

export interface VendorRelations {
  // describe navigational properties here
}

export type VendorWithRelations = Vendor & VendorRelations;
