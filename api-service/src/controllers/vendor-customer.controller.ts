import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {VendorCustomerBridge} from '../models';
import {
  VendorCustomerBridgeRepository,
  VendorRepository,
} from '../repositories';

@model()
export class VendorCode {
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

  @post('/vendor-customer-bridges')
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
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
      {fields: {vendorId: true}},
      {where: {code: vendorCode.code}},
    );

    var vend = new VendorCustomerBridge();
    vend.customer_id = currentUserProfile[securityId];
    vend.vendor_id = v.vendorId;

    return this.vendorCustomerBridgeRepository.create(vend);
  }

  @get('/vendor-customer-bridges')
  @authenticate('jwt')
  async find(): Promise<VendorCustomerBridge[]> {
    return this.vendorCustomerBridgeRepository.find();
  }
}
