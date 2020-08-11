import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  FilterBuilder,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {get, param, patch, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Order} from '../models';
import {
  OrderRepository,
  VendorCustomerBridgeRepository,
  VendorProductRepository,
  VendorRepository,
} from '../repositories';
import {OrderRequestBody} from '../schema/orders';

export class OrderController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
    @repository(VendorCustomerBridgeRepository)
    public vendorCustomerBridgeRepository: VendorCustomerBridgeRepository,
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
    @repository(VendorProductRepository)
    public vendorProductRepository: VendorProductRepository,
  ) {}

  @post('/orders')
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody(OrderRequestBody) request: any,
  ): Promise<any> {
    console.log(request);
    request.user_id = currentUserProfile[securityId];

    return new Promise((resolve, reject) => {
      this.orderRepository
        .create(request)
        .then(resp => {
          resolve({status: true, message: 'Order placed Successfully'});
        })
        .catch(err => {
          resolve({status: false, message: 'Unable to place order'});
        });
    });
  }

  @get('/orders')
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentuser: UserProfile,
  ): Promise<Order[]> {
    var filter = new FilterBuilder<Order>()
      .where({user_id: currentuser[securityId]})
      .build();

    return this.orderRepository.find(filter);
  }

  @get('/orders/{id}')
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Order, {exclude: 'where'})
    filter?: FilterExcludingWhere<Order>,
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }

  @patch('/orders/{id}')
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody()
    order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }
}
