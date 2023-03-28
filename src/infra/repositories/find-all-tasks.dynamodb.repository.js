import AWS from "aws-sdk";

export const findAllTasksDynamoDBRepository = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const results = await dynamodb
    .scan({
      TableName: "ToDoTable",
    })
    .promise();

  return results;
};
