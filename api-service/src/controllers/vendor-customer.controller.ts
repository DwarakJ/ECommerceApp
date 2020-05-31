import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
  model,
  property
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
import {VendorCustomerBridge, Vendor, VendorRelations} from '../models';
import {VendorCustomerBridgeRepository, VendorRepository} from '../repositories';
import {userId} from '../services/jwt-service'

@model()
export class VendorCode extends VendorCustomerBridge {
  @property({
    type: 'string',
    required: true,
  })
  code: string;
}

export class VendorCustomerController {
  constructor(
    @repository(VendorCustomerBridgeRepository)
    public vendorCustomerBridgeRepository : VendorCustomerBridgeRepository,
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
  ) {}

  @post('/vendor-customer-bridges', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge model instance',
        content: {'application/json': {schema: getModelSchemaRef(VendorCustomerBridge)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorCode, {
            title: 'NewVendorCustomerBridge',
            
          }),
        },
      },
    })
    vendorCode: VendorCode,
  ): Promise<VendorCustomerBridge> {
    
    // To pick Vendor ID
    var v: (Vendor & VendorRelations)[] = await this.vendorRepository.find({fields: {id: true}},{ where: {code : vendorCode.code}})

    var vendorid: string = v[0].id!
    
    vendorCode.customer_id = userId
    vendorCode.vendor_id = vendorid
    
    delete vendorCode.code
    
    return this.vendorCustomerBridgeRepository.create(vendorCode);
  }

  @get('/vendor-customer-bridges/count', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(VendorCustomerBridge) where?: Where<VendorCustomerBridge>,
  ): Promise<Count> {
    return this.vendorCustomerBridgeRepository.count(where);
  }

  @get('/vendor-customer-bridges', {
    responses: {
      '200': {
        description: 'Array of VendorCustomerBridge model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VendorCustomerBridge, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(VendorCustomerBridge) filter?: Filter<VendorCustomerBridge>,
  ): Promise<VendorCustomerBridge[]> {
    return this.vendorCustomerBridgeRepository.find(filter);
  }

  @patch('/vendor-customer-bridges', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorCustomerBridge, {partial: true}),
        },
      },
    })
    vendorCustomerBridge: VendorCustomerBridge,
    @param.where(VendorCustomerBridge) where?: Where<VendorCustomerBridge>,
  ): Promise<Count> {
    return this.vendorCustomerBridgeRepository.updateAll(vendorCustomerBridge, where);
  }

  @get('/vendor-customer-bridges/{id}', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VendorCustomerBridge, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VendorCustomerBridge, {exclude: 'where'}) filter?: FilterExcludingWhere<VendorCustomerBridge>
  ): Promise<VendorCustomerBridge> {
    return this.vendorCustomerBridgeRepository.findById(id, filter);
  }

  @patch('/vendor-customer-bridges/{id}', {
    responses: {
      '204': {
        description: 'VendorCustomerBridge PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VendorCustomerBridge, {partial: true}),
        },
      },
    })
    vendorCustomerBridge: VendorCustomerBridge,
  ): Promise<void> {
    await this.vendorCustomerBridgeRepository.updateById(id, vendorCustomerBridge);
  }

  @put('/vendor-customer-bridges/{id}', {
    responses: {
      '204': {
        description: 'VendorCustomerBridge PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendorCustomerBridge: VendorCustomerBridge,
  ): Promise<void> {
    await this.vendorCustomerBridgeRepository.replaceById(id, vendorCustomerBridge);
  }

  @del('/vendor-customer-bridges/{id}', {
    responses: {
      '204': {
        description: 'VendorCustomerBridge DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorCustomerBridgeRepository.deleteById(id);
  }
}