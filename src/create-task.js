import { v4 } from "uuid";
import { Validator } from "node-input-validator";
import { createTaskDynamoDBRepository } from "./infra/repositories/create-task.dynamodb.repository.js";

const payloadValidate = async (body) => {
  const validate = new Validator(body, {
    title: "required",
    description: "required",
  });

  await validate.check();

  return validate;
};

export async function handler(event) {
  const body = JSON.parse(event.body);
  const validator = await payloadValidate(body);

  if (!validator.matched && validator.matched !== undefined) {
    return {
      statusCode: 422,
      body: JSON.stringify(validator.errors),
    };
  }

  try {
    const id = v4();
    const createdAt = new Date().toISOString();
    const { title, description } = body;

    const newItem = {
      id,
      title,
      description,
      status: "PENDING",
      createdAt,
    };

    await createTaskDynamoDBRepository(newItem);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
        data: newItem,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao criar uma tarefa!",
      }),
    };
  }
}
