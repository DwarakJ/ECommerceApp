import {Entity, model, property} from '@loopback/repository';

@model()
export class VendorDeliveryExecutiveBridge extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  vendor_id: string;

  @property({
    type: 'string',
    required: true,
  })
  deliver_executive_id: string;

  constructor(data?: Partial<VendorDeliveryExecutiveBridge>) {
    super(data);
  }
}

export interface VendorDeliveryExecutiveBridgeRelations {
  // describe navigational properties here
}

export type VendorDeliveryExecutiveBridgeWithRelations = VendorDeliveryExecutiveBridge &
  VendorDeliveryExecutiveBridgeRelations;
