import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Product} from '../models';
import {
  ProductRepository,
  VendorCustomerBridgeRepository,
  VendorProductRepository,
} from '../repositories';
import {SECURITY_SPEC} from '../utils/security-spec';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
    @repository(VendorCustomerBridgeRepository)
    public vendorCustomerRepository: VendorCustomerBridgeRepository,
    @repository(VendorProductRepository)
    public vendorProductRepository: VendorProductRepository,
  ) {}

  @post('/products')
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProduct',
          }),
        },
      },
    })
    product: Product,
  ): Promise<Product> {
    return this.productRepository.create(product);
  }

  @authenticate('jwt')
  @get('/products')
  async find() {
    return {
      status: true,
      result: [
        {
          vendor_Id: 23243423,
          vendor_name: 'Abc',
          products: [
            {
              id: '5ecaadbaf5bc06c83c01955b',
              vendor_product_id: 1,
              name: 'Normal water',
              display_picture: 'string',
              price: 30.0,
            },
          ],
        },
        {
          vendor_Id: 23243423,
          vendor_name: 'Abc',
          products: [
            {
              id: '5ecaadbaf4bc06c83c01955b',
              vendor_product_id: 2,
              name: 'Bisleri water',
              display_picture: 'string',
              price: 80.0,
            },
          ],
        },
      ],
    };
  }

  @patch('/products', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  //@authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
    @param.where(Product) where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.updateAll(product, where);
  }

  @get('/products/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Product, {exclude: 'where'})
    filter?: FilterExcludingWhere<Product>,
  ): Promise<Product> {
    return this.productRepository.findById(id, filter);
  }
}
