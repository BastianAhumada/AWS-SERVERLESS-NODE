const { DynamoDB } = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');

module.exports = async (event) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const {type , firstname , age, status_animal}  = JSON.parse(event.body)

  const SK = `#${type}#${firstname}`.toUpperCase()
  const PK = `#CREATE-${type}#${uuidv4()}`.toUpperCase()

  const newAnimal = { PK, SK, type, firstname, age , status_animal }
  
  try {
    const add = await dynamodb.put({
      TableName: "RegAnimal",
      Item: newAnimal
    }).promise()
    
    return {
      code: 'Success',
      message:'Insert Corrected'
    }
  } catch (error) {
    return {
      code: 'Error',
      message:error
    }
  }
}
