import {Entity, model, property} from '@loopback/repository';
import {orderstatus, paymentmode, paymentstatus} from '../static';

@model({settings: {strict: false}})
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  user_id: string;

  @property({
    type: 'object',
  })
  products: object;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  created_time: string;

  @property({
    type: 'string',
  })
  delivered_time?: string;

  @property({
    type: 'string',
  })
  order_status?: orderstatus;

  @property({
    type: 'string',
    default: false,
  })
  payment_status: paymentstatus;

  @property({
    type: 'string',
    default: 'COD',
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
