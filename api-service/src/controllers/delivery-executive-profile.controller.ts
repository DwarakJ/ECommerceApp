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
import {DeliveryExecutive} from '../models';
import {DeliveryExecutiveRepository} from '../repositories';
import {SECURITY_SPEC} from '../utils/security-spec';
import {authenticate} from '@loopback/authentication';

export class DeliveryExecutiveProfileController {
  constructor(
    @repository(DeliveryExecutiveRepository)
    public deliveryExecutiveRepository : DeliveryExecutiveRepository,
  ) {}

  @post('/delivery-executives', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'DeliveryExecutive model instance',
        content: {'application/json': {schema: getModelSchemaRef(DeliveryExecutive)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeliveryExecutive, {
            title: 'NewDeliveryExecutive',
            
          }),
        },
      },
    })
    deliveryExecutive: DeliveryExecutive,
  ): Promise<DeliveryExecutive> {
    return this.deliveryExecutiveRepository.create(deliveryExecutive);
  }

  @get('/delivery-executives/count', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'DeliveryExecutive model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(DeliveryExecutive) where?: Where<DeliveryExecutive>,
  ): Promise<Count> {
    return this.deliveryExecutiveRepository.count(where);
  }

  @get('/delivery-executives', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of DeliveryExecutive model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DeliveryExecutive, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.filter(DeliveryExecutive) filter?: Filter<DeliveryExecutive>,
  ): Promise<DeliveryExecutive[]> {
    return this.deliveryExecutiveRepository.find(filter);
  }

  @patch('/delivery-executives', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'DeliveryExecutive PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeliveryExecutive, {partial: true}),
        },
      },
    })
    deliveryExecutive: DeliveryExecutive,
    @param.where(DeliveryExecutive) where?: Where<DeliveryExecutive>,
  ): Promise<Count> {
    return this.deliveryExecutiveRepository.updateAll(deliveryExecutive, where);
  }

  @get('/delivery-executives/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '200': {
        description: 'DeliveryExecutive model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DeliveryExecutive, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DeliveryExecutive, {exclude: 'where'}) filter?: FilterExcludingWhere<DeliveryExecutive>
  ): Promise<DeliveryExecutive> {
    return this.deliveryExecutiveRepository.findById(id, filter);
  }

  @patch('/delivery-executives/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'DeliveryExecutive PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeliveryExecutive, {partial: true}),
        },
      },
    })
    deliveryExecutive: DeliveryExecutive,
  ): Promise<void> {
    await this.deliveryExecutiveRepository.updateById(id, deliveryExecutive);
  }

  @put('/delivery-executives/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'DeliveryExecutive PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() deliveryExecutive: DeliveryExecutive,
  ): Promise<void> {
    await this.deliveryExecutiveRepository.replaceById(id, deliveryExecutive);
  }

  @del('/delivery-executives/{id}', {
    security: SECURITY_SPEC,
    responses: {
      '204': {
        description: 'DeliveryExecutive DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deliveryExecutiveRepository.deleteById(id);
  }
}
