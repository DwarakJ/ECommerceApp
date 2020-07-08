import {Entity, model, property} from '@loopback/repository';

enum orderstatus {
  Scheduled = "1",
  Accepted = "2",
  Delivered = "3",
  Rejected = "0"
}

@model()
export class DeliveryStatus extends Entity {

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(orderstatus),
    },
  })
  status: orderstatus;

  constructor(data?: Partial<DeliveryStatus>) {
    super(data);
  }
}

export interface DeliveryStatusRelations {
  // describe navigational properties here
}

export type DeliveryStatusWithRelations = DeliveryStatus &
  DeliveryStatusRelations;
