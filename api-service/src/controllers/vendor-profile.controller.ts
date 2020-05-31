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
import {Vendor} from '../models';
import {VendorRepository} from '../repositories';
import {SECURITY_SPEC} from '../utils/security-spec';
import {authenticate} from '@loopback/authentication';

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
            
          }),
        },
      },
    })
    vendor: Vendor,
  ): Promise<Vendor> {
    return this.vendorRepository.create(vendor);
  }

  @get('/vendors/count', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Vendor model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })

  @authenticate('jwt')
  async count(
    @param.where(Vendor) where?: Where<Vendor>,
  ): Promise<Count> {
    return this.vendorRepository.count(where);
  }

  @get('/vendors', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Vendor, {includeRelations: true}),
            },
          },
        },
      },
    },
  })

  @authenticate('jwt')
  async find(
    @param.filter(Vendor) filter?: Filter<Vendor>,
  ): Promise<Vendor[]> {
    return this.vendorRepository.find(filter);
  }

  @patch('/vendors', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Vendor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })

  @authenticate('jwt')
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
    security: SECURITY_SPEC,
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

  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendor, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendor>
  ): Promise<Vendor> {
    return this.vendorRepository.findById(id, filter);
  }

  @patch('/vendors/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Vendor PATCH success',
      },
    },
  })

  @authenticate('jwt')
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
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Vendor PUT success',
      },
    },
  })

  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.replaceById(id, vendor);
  }

  @del('/vendors/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Vendor DELETE success',
      },
    },
  })

  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorRepository.deleteById(id);
  }
}
