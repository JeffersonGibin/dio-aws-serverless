import AWS from "aws-sdk";

export const findByStatusDynamoDBRepository = async (status) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan({
        TableName: "ToDoTable",
        FilterExpression: "#status = :status",
        ExpressionAttributeNames: {
          "#status": "status"
        },
        ExpressionAttributeValues: {
          ":status": status
        }
      }).promise().then((result) => result?.Items);

      return result;
}