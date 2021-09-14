import {Entity, model, property, Model} from '@loopback/repository';
import {orderstatus, paymentmode, paymentstatus} from '../static';
@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})

@model()
class ProductInfo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  totalprice: string;

  @property({
    type: 'number',
    required: true,
  })
  qty: number;

  constructor(data?: Partial<ProductInfo>) {
    super(data);
  }
}

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

  @property.array(ProductInfo, {required: true})
  products: ProductInfo[];

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

  @property({
    type: 'number'
  })
  overallprice?: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
