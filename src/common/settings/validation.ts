import * as Joi from 'joi';

export const validationSchema = Joi.object({
  HTTP_SERVER_PORT: Joi.string().required(),
  JWT_ACCESS_KEY: Joi.string().required(),
  JWT_REFRESH_KEY: Joi.string().required(),
  JWT_SIGN_KEY: Joi.string().required(),
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASS: Joi.string().required(),
  PGHOST: Joi.string().required(),
  PGPORT: Joi.string().required(),
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  REST_WOMPI_API_HOST: Joi.string().required(),
  WOMPI_SECRET_PUBLIC_KEY: Joi.string().required(),
  WOMPI_SECRET_PRIVATE_KEY: Joi.string().required(),
});
