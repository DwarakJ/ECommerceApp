import {belongsTo, Entity, model, Model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
class Vendors extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;
}

@model()
export class VendorCustomerBridge extends Entity {
  @property.array(Vendors, {required: true})
  vendors: Vendors[];

  @property({
    type: 'string',
    required: false,
    id: true,
  })
  customer_id: string;

  @belongsTo(() => User)
  customerId: string;

  constructor(data?: Partial<VendorCustomerBridge>) {
    super(data);
  }
}

export interface VendorCustomerBridgeRelations {
  // describe navigational properties here
}

export type VendorCustomerBridgeWithRelations = VendorCustomerBridge &
  VendorCustomerBridgeRelations;
