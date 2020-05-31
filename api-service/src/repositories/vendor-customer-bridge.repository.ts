import {DefaultCrudRepository} from '@loopback/repository';
import {VendorCustomerBridge, VendorCustomerBridgeRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VendorCustomerBridgeRepository extends DefaultCrudRepository<
  VendorCustomerBridge,
  typeof VendorCustomerBridge.prototype.id,
  VendorCustomerBridgeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(VendorCustomerBridge, dataSource);
  }
}
