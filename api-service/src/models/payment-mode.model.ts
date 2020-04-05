import {Entity, model, property} from '@loopback/repository';

@model()
export class PaymentMode extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
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
