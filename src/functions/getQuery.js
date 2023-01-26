const { DynamoDB } = require("aws-sdk");

module.exports = async (event) => {

  const dynamodb = new DynamoDB.DocumentClient();
  const { PK  , SK}  = JSON.parse(event.body)

  const params = {
    TableName: 'RegAnimal',
    KeyConditionExpression: "PK = :PK and begins_with (SK , :SK)",
    ExpressionAttributeValues: { ":PK": PK , ":SK": SK }
  }
  try {
    const data = await dynamodb.query(params).promise();
    return {
      code: 'SUCCESS',
      message: data.Items
    }
  }catch(e) {
    return {
      code: 'ERROR',
      message: e.message
    }
  }

}