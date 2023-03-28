import { Validator } from "node-input-validator";
import { chooseStatusTaskTaskDynamoDBRepository } from "./infra/repositories/choose-status-task.dynamodb.repository.js";
import { findByIdDynamoDBRepository } from "./infra/repositories/find-by-id.dynamodb.repository.js";
import { chooseStatusTaskUseCase } from './core/usecases/choose-status-task.usecase.js'

const payloadValidate = async (body) => {
  const validate = new Validator(body, {
    status: "required|in:IN_PROGRESS, COMPLETED",
  });

  await validate.check();

  return validate;
};

export async function handler(event) {
  const body = JSON.parse(event.body) ?? {};
  const validator = await payloadValidate(body);

  if (!validator.matched && validator.matched !== undefined) {
    return {
      statusCode: 422,
      body: JSON.stringify(validator.errors),
    };
  }
  const id = event.pathParameters?.id ?? "";

  try {

    const result = await chooseStatusTaskUseCase(
      {
        id,
        status: body.status,
      },
      {
        findByIdDynamoDBRepository,
        chooseStatusTaskTaskDynamoDBRepository,
      }
    );

    console.log(result)

    if(result.status !== "SUCCESS"){
      return {
        statusCode: 422,
        body: JSON.stringify({
          status: result.status,
          message: result.message,
        }), 
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: result.status,
        message: result.message,
      }),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao alterar o status!",
      }),
    };
  }
}
