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

export class DeliveryExecutiveProfileController {
  constructor(
    @repository(DeliveryExecutiveRepository)
    public deliveryExecutiveRepository : DeliveryExecutiveRepository,
  ) {}

  @post('/delivery-executives', {
    responses: {
      '200': {
        description: 'DeliveryExecutive model instance',
        content: {'application/json': {schema: getModelSchemaRef(DeliveryExecutive)}},
      },
    },
  })
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
    responses: {
      '200': {
        description: 'DeliveryExecutive model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DeliveryExecutive) where?: Where<DeliveryExecutive>,
  ): Promise<Count> {
    return this.deliveryExecutiveRepository.count(where);
  }

  @get('/delivery-executives', {
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
  async find(
    @param.filter(DeliveryExecutive) filter?: Filter<DeliveryExecutive>,
  ): Promise<DeliveryExecutive[]> {
    return this.deliveryExecutiveRepository.find(filter);
  }

  @patch('/delivery-executives', {
    responses: {
      '200': {
        description: 'DeliveryExecutive PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
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
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DeliveryExecutive, {exclude: 'where'}) filter?: FilterExcludingWhere<DeliveryExecutive>
  ): Promise<DeliveryExecutive> {
    return this.deliveryExecutiveRepository.findById(id, filter);
  }

  @patch('/delivery-executives/{id}', {
    responses: {
      '204': {
        description: 'DeliveryExecutive PATCH success',
      },
    },
  })
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
    responses: {
      '204': {
        description: 'DeliveryExecutive PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() deliveryExecutive: DeliveryExecutive,
  ): Promise<void> {
    await this.deliveryExecutiveRepository.replaceById(id, deliveryExecutive);
  }

  @del('/delivery-executives/{id}', {
    responses: {
      '204': {
        description: 'DeliveryExecutive DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deliveryExecutiveRepository.deleteById(id);
  }
}
