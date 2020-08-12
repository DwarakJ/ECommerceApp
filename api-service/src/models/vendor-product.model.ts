import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})
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
  name: string;

  @property({
    type: 'string',
  })
  vendor_id: string;

  @property({
    type: 'string',
  })
  stock_quantity: string;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: false,
  })
  display_picture: string;

  constructor(data?: Partial<VendorProduct>) {
    super(data);
  }
}

export interface VendorProductRelations {
  // describe navigational properties here
}

export type VendorProductWithRelations = VendorProduct & VendorProductRelations;
