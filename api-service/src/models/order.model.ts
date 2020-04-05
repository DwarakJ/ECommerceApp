import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
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
  vendor_product_id: string;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    required: true,
  })
  vendor_id: string;

  @property({
    type: 'date',
    required: true,
  })
  created_time: string;

  @property({
    type: 'string',
  })
  delivered_time?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
  })
  delivery_status?: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  payment_status: boolean;

  @property({
    type: 'number',
  })
  payment_mode?: number;


  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
