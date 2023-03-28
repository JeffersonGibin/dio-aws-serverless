import { findAllTasksDynamoDBRepository } from "./infra/repositories/find-all-tasks.dynamodb.repository.js";
import { buildSearchResultsForTasksUseCase } from "./core/usecases/build-search-results-for-tasks.usecase.js";

export async function handler(event) {
  try {
    const newResult = await buildSearchResultsForTasksUseCase({
      findAllTasksDynamoDBRepository,
    });

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
        message: "Ocorreu um erro ao buscar as tarefas!",
      }),
    };
  }
}
