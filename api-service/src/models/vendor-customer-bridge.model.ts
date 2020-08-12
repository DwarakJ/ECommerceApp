import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})
export class VendorCustomerBridge extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  vendor_id: string;

  @property({
    type: 'string',
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
