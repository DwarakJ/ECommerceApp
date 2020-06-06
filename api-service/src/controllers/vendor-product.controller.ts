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
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {VendorProduct} from '../models';
import {VendorProductRepository} from '../repositories';
import {userId} from '../services/jwt-service'

export class VendorProductController {
  constructor(
    @repository(VendorProductRepository)
    public vendorProductRepository : VendorProductRepository,
  ) {}

  @post('/vendor-products', {
    responses: {
      '200': {
        description: 'VendorProduct model instance',
        content: {'application/json': {schema: getModelSchemaRef(VendorProduct)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorProduct, {
            title: 'NewVendorProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    vendorProduct: VendorProduct,
  ): Promise<VendorProduct> {
    vendorProduct.vendor_id = userId
    return this.vendorProductRepository.create(vendorProduct);
  }



  @get('/vendor-products', {
    responses: {
      '200': {
        description: 'Array of VendorProduct model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VendorProduct, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(VendorProduct) filter?: Filter<VendorProduct>,
  ): Promise<VendorProduct[]> {
    return this.vendorProductRepository.find(filter);
  }

  @patch('/vendor-products', {
    responses: {
      '200': {
        description: 'VendorProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorProduct, {partial: true}),
        },
      },
    })
    vendorProduct: VendorProduct,
    @param.where(VendorProduct) where?: Where<VendorProduct>,
  ): Promise<Count> {
    return this.vendorProductRepository.updateAll(vendorProduct, where);
  }

  @get('/vendor-products/{id}', {
    responses: {
      '200': {
        description: 'VendorProduct model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VendorProduct, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VendorProduct, {exclude: 'where'}) filter?: FilterExcludingWhere<VendorProduct>
  ): Promise<VendorProduct> {
    return this.vendorProductRepository.findById(id, filter);
  }

  @patch('/vendor-products/{id}', {
    responses: {
      '204': {
        description: 'VendorProduct PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorProduct, {partial: true}),
        },
      },
    })
    vendorProduct: VendorProduct,
  ): Promise<void> {
    await this.vendorProductRepository.updateById(id, vendorProduct);
  }

  @put('/vendor-products/{id}', {
    responses: {
      '204': {
        description: 'VendorProduct PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendorProduct: VendorProduct,
  ): Promise<void> {
    await this.vendorProductRepository.replaceById(id, vendorProduct);
  }

  @del('/vendor-products/{id}', {
    responses: {
      '204': {
        description: 'VendorProduct DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorProductRepository.deleteById(id);
  }
}
