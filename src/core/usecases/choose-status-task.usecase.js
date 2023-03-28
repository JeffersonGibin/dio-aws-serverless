export const chooseStatusTaskUseCase = async (input, repositories) => {
  const { findByIdDynamoDBRepository, chooseStatusTaskTaskDynamoDBRepository } = repositories;

  const resultTaskById = await findByIdDynamoDBRepository(input?.id);

  if (resultTaskById?.status === "IN_PROGRESS") {
    return {
      status: "TASK_IS_IN_PROGRESS",
      message: "Essa tarefa já está em progresso e não pode ser atualizada!",
    };
  }

  if (resultTaskById?.status === "COMPLETED") {
    return {
      status: "TASK_WAS_COMPLETED",
      message: "Essa tarefa já foi finalizada e não pode ser atualizada!",
    };
  }

  await chooseStatusTaskTaskDynamoDBRepository({
    id: input?.id,
    status: input?.status,
  });

  return {
    status: "SUCCESS",
    message: `Status Updated to ${input?.status}`,
  };
};
