import {authenticate} from '@loopback/authentication';
import {
  FilterBuilder,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Order} from '../models';
import {
  OrderRepository,
  VendorCustomerBridgeRepository,
  VendorProductRepository,
  VendorRepository,
} from '../repositories';
import {OrderRequestBody} from '../schema/orders';
import {userId} from '../services/jwt-service';
import {SECURITY_SPEC} from '../utils/security-spec';

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
  //@authenticate('jwt')
  async create(@requestBody(OrderRequestBody) request: any): Promise<any> {
    console.log(request);
    await this.orderRepository
      .create(request)
      .then(resp => {
        console.log('resp', resp);
        //return resp;
      })
      .catch(err => {
        console.log('rrr', err);
      });
    // // To pick Vendor ID
    // var v: any = await this.vendorProductRepository.findOne(
    //   {where: {id: request.VendorProductId}},
    // );

    // var cart = new Order
    // cart.quantity = orders.quantity
    // cart.vendor_product_id = orders.VendorProductId
    // cart.vendor_id = v.vendor_id
    // cart.user_id = userId
    // cart.created_time = Date.now().toString()
    // cart.order_status = orderstatus.Scheduled

    return new Object();
  }

  @get('/orders', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Order model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Order, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(): Promise<Order[]> {
    var filter = new FilterBuilder<Order>().where({user_id: userId}).build();

    return this.orderRepository.find(filter);
  }

  @get('/orders/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Order model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Order, {exclude: 'where'})
    filter?: FilterExcludingWhere<Order>,
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }

  @patch('/orders/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Order PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

  @put('/orders/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Order PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.replaceById(id, order);
  }
}
