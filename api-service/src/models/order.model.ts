import {Entity, model, property} from '@loopback/repository';
import {orderstatus, paymentmode, paymentstatus} from '../static';

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
    type: 'string',
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
    type: 'string',
  })
  order_status?: orderstatus;

  @property({
    type: 'string',
    required: true,
    default: false,
  })
  payment_status: paymentstatus;

  @property({
    type: 'string',
  })
  payment_mode?: paymentmode;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
