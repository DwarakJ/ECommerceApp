import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Product} from '../models';
import {ProductRepository} from '../repositories';
import {SECURITY_SPEC} from '../utils/security-spec';
import {authenticate} from '@loopback/authentication';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository : ProductRepository,
  ) {}

  @post('/products', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })

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

  @get('/products/count', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })

  @authenticate('jwt')
  async count(
    @param.where(Product) where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.count(where);
  }

  @get('/products', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Product, {includeRelations: true}),
            },
          },
        },
      },
    },
  })

  @authenticate('jwt')
  async find(
  ): Promise<Product[]> {
    return this.productRepository.find();
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

  @authenticate('jwt')
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
    @param.filter(Product, {exclude: 'where'}) filter?: FilterExcludingWhere<Product>
  ): Promise<Product> {
    return this.productRepository.findById(id, filter);
  }

  @patch('/products/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })

  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @put('/products/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product PUT success',
      },
    },
  })

  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() product: Product,
  ): Promise<void> {
    await this.productRepository.replaceById(id, product);
  }

  @del('/products/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })

  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
