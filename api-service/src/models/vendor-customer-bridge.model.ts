import {belongsTo, Entity, model, Model, property} from '@loopback/repository';
import {User} from './user.model';
import {Vendor} from './vendor.model';


@model()
export class VendorCustomerBridge extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  vendor_id: string;

  @belongsTo(() => Vendor)
  vendorId: string;

  @property({
    type: 'string',
    required: false,
    id: true,
  })
  customer_id: string;

  @belongsTo(() => User)
  customerId: string;

  constructor(data?: Partial<VendorCustomerBridge>) {
    super(data);
  }
}

export interface VendorCustomerBridgeRelations {
  // describe navigational properties here
}

export type VendorCustomerBridgeWithRelations = VendorCustomerBridge &
  VendorCustomerBridgeRelations;
