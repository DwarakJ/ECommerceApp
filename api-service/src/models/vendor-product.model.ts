import {Entity, model, property} from '@loopback/repository';

@model()
export class VendorProduct extends Entity {
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
  })
  product_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  stock_quantity: string;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  constructor(data?: Partial<VendorProduct>) {
    super(data);
  }
}

export interface VendorProductRelations {
  // describe navigational properties here
}

export type VendorProductWithRelations = VendorProduct & VendorProductRelations;
