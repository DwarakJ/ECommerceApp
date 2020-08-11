import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Filter, FilterBuilder, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {VendorCustomerBridge, VendorProduct} from '../models';
import {
  VendorCustomerBridgeRepository,
  VendorProductRepository,
} from '../repositories';

export class VendorProductController {
  constructor(
    @repository(VendorProductRepository)
    public vendorProductRepository: VendorProductRepository,
    @repository(VendorCustomerBridgeRepository)
    public vendorCustomerRepository: VendorCustomerBridgeRepository,
  ) {}

  @post('/vendor-products')
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
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
    vendorProduct.vendor_id = currentUserProfile[securityId];
    return this.vendorProductRepository.create(vendorProduct);
  }

  @get('/vendor-products')
  @authenticate('jwt')
  async getAllVendorProducts(
    @param.filter(VendorProduct) filter?: Filter<VendorProduct>,
  ): Promise<any> {
    var allProducts = await this.vendorProductRepository.find();
    return new Promise((resolve, reject) => {
      var result = allProducts;
      console.log(result);
      resolve({
        status: true,
        result: {products: [{result}]},
      });
    });
  }

  asyncForEach = async (array: any, callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  @get('/vendor-products-by-customer')
  @authenticate('jwt')
  async getProductsByCustomer(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<any> {
    var filter = new FilterBuilder<VendorCustomerBridge>()
      .where({customer_id: currentUserProfile[securityId]})
      .build();

    var vendor = await this.vendorCustomerRepository.find(filter);
    var vendorProductsList: any = [];
    var self = this;
    await this.asyncForEach(vendor, async (vendor: any) => {
      var vendorFilter = new FilterBuilder<VendorProduct>()
        .where({vendor_id: vendor.vendor_id})
        .build();

      var temp: any = await self.vendorProductRepository.find(vendorFilter);

      var vendor_products = {
        vendor_id: vendor.vendor_id,
        products: temp,
      };
      vendorProductsList.push(vendor_products);
    });

    return new Promise((resolve, reject) => {
      var result = vendorProductsList;
      resolve({
        status: true,
        result: result,
      });
    });
  }
}
