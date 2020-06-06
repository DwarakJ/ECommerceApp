import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {VendorCustomerBridge, VendorCustomerBridgeRelations} from '../models';

export class VendorCustomerBridgeRepository extends DefaultCrudRepository<
  VendorCustomerBridge,
  typeof VendorCustomerBridge.prototype.customer_id,
  VendorCustomerBridgeRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(VendorCustomerBridge, dataSource);
  }
}
