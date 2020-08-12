import {Entity, model, property} from '@loopback/repository';

enum paymentmode {
  COD = '1',
  Card = '2',
}

@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})
export class PaymentMode extends Entity {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(paymentmode),
    },
  })
  status: string;

  constructor(data?: Partial<PaymentMode>) {
    super(data);
  }
}

export interface PaymentModeRelations {
  // describe navigational properties here
}

export type PaymentModeWithRelations = PaymentMode & PaymentModeRelations;
