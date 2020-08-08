import {Entity, model, property} from '@loopback/repository';

@model()
export class VendorCustomerBridge extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    id: false,
    generated: false,
  })
  vendor_id?: string;

  @property({
    type: 'string',
    id: false,
    generated: false,
  })
  customer_id?: string;
  constructor(data?: Partial<VendorCustomerBridge>) {
    super(data);
  }
}

export interface VendorCustomerBridgeRelations {
  // describe navigational properties here
}

export type VendorCustomerBridgeWithRelations = VendorCustomerBridge &
  VendorCustomerBridgeRelations;
