import {Entity, model, property} from '@loopback/repository';

@model()
export class VendorUserBridge extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  vendor_id: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  constructor(data?: Partial<VendorUserBridge>) {
    super(data);
  }
}

export interface VendorUserBridgeRelations {
  // describe navigational properties here
}

export type VendorUserBridgeWithRelations = VendorUserBridge &
  VendorUserBridgeRelations;
