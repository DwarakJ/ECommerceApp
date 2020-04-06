import {DefaultCrudRepository} from '@loopback/repository';
import {DeliveryExecutive, DeliveryExecutiveRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DeliveryExecutiveRepository extends DefaultCrudRepository<
  DeliveryExecutive,
  typeof DeliveryExecutive.prototype.id,
  DeliveryExecutiveRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(DeliveryExecutive, dataSource);
  }
}
