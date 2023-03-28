export const buildSearchResultByStatusUseCase = async (input, repositories) => {
  const result = await repositories.findByStatusDynamoDBRepository(
    input.status
  );

  return result.reduce((newResult, item) => {
    if (item.status === "PENDING") {
      newResult.push({
        id: item.id,
        status: "PENDING",
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      });
    }

    if (item.status === "IN_PROGRESS") {
      newResult.push({
        id: item.id,
        status: "IN_PROGRESS",
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      });
    }

    if (item.status === "COMPLETED") {
      newResult.push({
        id: item.id,
        status: "COMPLETED",
        title: item.title,
        description: item.description,
        completeDate: item.completeDate,
        createdAt: item.createdAt,
      });
    }

    return newResult;
  }, []);
};
