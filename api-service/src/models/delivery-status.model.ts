import {Entity, model, property} from '@loopback/repository';

@model()
export class DeliveryStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;


  constructor(data?: Partial<DeliveryStatus>) {
    super(data);
  }
}

export interface DeliveryStatusRelations {
  // describe navigational properties here
}

export type DeliveryStatusWithRelations = DeliveryStatus & DeliveryStatusRelations;
