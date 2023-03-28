import AWS from "aws-sdk";

export const createTaskDynamoDBRepository = async (payload) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb
    .put({
      TableName: "ToDoTable",
      Item: payload,
    })
    .promise();

  return result;
};
