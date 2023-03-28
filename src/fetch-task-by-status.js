import { findByStatusDynamoDBRepository } from "./infra/repositories/find-by-status.dynamodb.repository.js";
import { buildSearchResultByStatusUseCase } from "./core/usecases/build-search-results-by-status.usecase.js";

export async function handler(event) {
  const { status } = event.pathParameters;

  try {
    const newResult = await buildSearchResultByStatusUseCase(
      { status },
      {
        findByStatusDynamoDBRepository,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "SUCCESS",
        data: newResult,
      }),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "ERROR",
        message: "Ocorreu um erro ao buscar tarefas por status!",
      }),
    };
  }
}
