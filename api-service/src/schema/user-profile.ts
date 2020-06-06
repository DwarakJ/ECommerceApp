export const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    email: {type: 'string'},
    name: {type: 'string'},
  },
};

export type Credentials = {
  phone: string;
};

const CredentialsSchema = {
  type: 'object',
  required: ['phone'],
  properties: {
    phone: {
      type: 'string',
    },
  },
};

const OTPCredentialsSchema = {
  type: 'object',
  required: ['otp', 'sessionid'],
  properties: {
    otp: {
      type: 'string',
    },
    sessionid: {
      type: 'string',
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
  },
};

export const UserRegistrationSchema = {
  type: 'object',
  required: ['first_name', 'last_name', 'email', 'address'],
  properties: {
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export const OTPCredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: OTPCredentialsSchema},
  },
};
