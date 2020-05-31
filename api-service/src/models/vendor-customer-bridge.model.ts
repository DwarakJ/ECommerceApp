import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Vendor } from './vendor.model';
import { User } from './user.model';

@model()
export class VendorCustomerBridge extends Entity {
  @property({
    type: 'string',
    required: false,
  })
  vendor_id: string;

  @belongsTo(() => Vendor)
  vendorId: string

  @property({
    type: 'string',
    required: false,
  })
  customer_id: string;

  @belongsTo(() => User)
  customerId: string

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<VendorCustomerBridge>) {
    super(data);
  }
}

export interface VendorCustomerBridgeRelations {
  // describe navigational properties here
}

export type VendorCustomerBridgeWithRelations = VendorCustomerBridge &
  VendorCustomerBridgeRelations;
