const { DynamoDB } = require("aws-sdk");

module.exports = async (event) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const { PK, SK, status_animal } = JSON.parse(event.body);

  try {
    const update = await dynamodb.update({
      TableName: "RegAnimal",
      Key: { PK: PK , SK : SK},
      UpdateExpression: "set status_animal = :status_animal",
      ExpressionAttributeValues: {
        ":status_animal": status_animal,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
    console.log(update)
    return {
      code: 'Success',
      message: 'Update Correct'
    }
  } catch (error) {
    return {
      code: 'Error',
      message: error
    }
  }
}