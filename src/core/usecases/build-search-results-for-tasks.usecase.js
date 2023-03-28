export const buildSearchResultsForTasksUseCase = async (repositories) => {
  const results = await repositories.findAllTasksDynamoDBRepository();

  const resultItem = results.Items ?? [];
  const resultProcessed = resultItem.reduce(
    (newResult, item) => {
      if (item.status === "PENDING") {
        newResult.pending.push({
          id: item.id,
          status: "PENDING",
          title: item.title,
          description: item.description,
          createdAt: item.createdAt,
        });
      }

      if (item.status === "IN_PROGRESS") {
        newResult.in_progress.push({
          id: item.id,
          status: "IN_PROGRESS",
          title: item.title,
          description: item.description,
          createdAt: item.createdAt,
        });
      }

      if (item.status === "COMPLETED") {
        newResult.completed.push({
          id: item.id,
          status: "COMPLETED",
          title: item.title,
          description: item.description,
          completeDate: item.completeDate,
          createdAt: item.createdAt,
        });
      }

      return newResult;
    },
    {
      pending: [],
      in_progress: [],
      completed: [],
    }
  );

  return resultProcessed;
};
