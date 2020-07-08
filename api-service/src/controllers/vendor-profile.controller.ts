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
import {Vendor} from '../models';
import {VendorRepository} from '../repositories';

export class VendorProfileController {
  constructor(
    @repository(VendorRepository)
    public vendorRepository : VendorRepository,
  ) {}

  @post('/vendors', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vendor)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, {
            title: 'NewVendor',
            exclude: ['id'],
          }),
        },
      },
    })
    vendor: Omit<Vendor, 'id'>,
  ): Promise<Vendor> {
    return this.vendorRepository.create(vendor);
  }

  @get('/vendors/count', {
    responses: {
      '200': {
        description: 'Vendor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Vendor) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.count(where);
  }

  @get('/vendors', {
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vendor),
            },
          },
        },
      },
    },
  })
  async find(
  ): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }

  @patch('/vendors', {
    responses: {
      '200': {
        description: 'Vendor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, {partial: true}),
        },
      },
    })
    vendor: Vendor,
    @param.where(Vendor) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.updateAll(vendor, where);
  }

  @get('/vendors/{id}', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vendor, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendor, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendor>
  ): Promise<Vendor> {
    return this.vendorRepository.findById(id, filter);
  }

  @patch('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendor, {partial: true}),
        },
      },
    })
    vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.updateById(id, vendor);
  }

  @put('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.replaceById(id, vendor);
  }

  @del('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorRepository.deleteById(id);
  }
}
