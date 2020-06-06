import {
  Filter,
  FilterExcludingWhere,
  model,
  property,
  repository,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {VendorCustomerBridge} from '../models';
import {
  VendorCustomerBridgeRepository,
  VendorRepository,
} from '../repositories';

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
    public vendorCustomerBridgeRepository: VendorCustomerBridgeRepository,
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
  ) {}

  @post('/vendor-customer-bridges', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(VendorCustomerBridge)},
        },
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
    var v: any = await this.vendorRepository.findOne(
      {fields: {id: true}},
      {where: {code: vendorCode.code}},
    );

    // var vendorid: string = v.id!;

    // vendorCode.customer_id = userId;
    // vendorCode.vendor_id = vendorid;

    // delete vendorCode.code;

    return this.vendorCustomerBridgeRepository.create(vendorCode);
  }

  @get('/vendor-customer-bridges', {
    responses: {
      '200': {
        description: 'Array of VendorCustomerBridge model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(VendorCustomerBridge, {
                includeRelations: true,
              }),
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

  @get('/vendor-customer-bridges/{id}', {
    responses: {
      '200': {
        description: 'VendorCustomerBridge model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VendorCustomerBridge, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VendorCustomerBridge, {exclude: 'where'})
    filter?: FilterExcludingWhere<VendorCustomerBridge>,
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
    await this.vendorCustomerBridgeRepository.updateById(
      id,
      vendorCustomerBridge,
    );
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
    await this.vendorCustomerBridgeRepository.replaceById(
      id,
      vendorCustomerBridge,
    );
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
