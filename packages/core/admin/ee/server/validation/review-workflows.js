'use strict';

const { yup, validateYupSchema } = require('@strapi/utils');

const stageObject = yup.object().shape({
  id: yup.number().integer().min(1),
  name: yup.string().max(255).required(),
  color: yup
    .string()
    .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, 'Color needs to be an hexadecimal string.'),
});

const validateUpdateStagesSchema = yup.array().of(stageObject).required();
const validateUpdateStageOnEntity = yup
  .object()
  .shape({
    id: yup.number().integer().min(1).required(),
  })
  .required();

module.exports = {
  validateStage: validateYupSchema(stageObject, {
    strict: false,
    stripUnknown: true,
  }),
  validateUpdateStages: validateYupSchema(validateUpdateStagesSchema, {
    strict: false,
    stripUnknown: true,
  }),
  validateUpdateStageOnEntity: validateYupSchema(validateUpdateStageOnEntity),
};
