import {DefaultCrudRepository} from '@loopback/repository';
import {VendorProduct, VendorProductRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VendorProductRepository extends DefaultCrudRepository<
  VendorProduct,
  typeof VendorProduct.prototype.id,
  VendorProductRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(VendorProduct, dataSource);
  }
}
