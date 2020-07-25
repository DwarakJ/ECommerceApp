const OrderSchema = {
  additionProperties: false,
  type: 'object',
  properties: {
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          vendor_product_id: {type: 'string'},
          quantity: {type: 'number'},
        },
      },
    },
  },
};

export const OrderRequestBody = {
  description: '',
  required: true,
  content: {
    'application/json': {schema: OrderSchema},
  },
};
