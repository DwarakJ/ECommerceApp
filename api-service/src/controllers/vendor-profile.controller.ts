import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {Vendor} from '../models';
import {VendorRepository} from '../repositories';

export class VendorProfileController {
  constructor(
    @repository(VendorRepository)
    public vendorRepository: VendorRepository,
  ) {}

  @post('/vendors')
  @authenticate('jwt')
  async create(@requestBody() vendor: any): Promise<Vendor> {
    return this.vendorRepository.create(vendor);
  }

  @get('/vendors')
  @authenticate('jwt')
  async find(): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }
}
