import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';

type newAnimal = {
  PK: string,
  SK: string,
  type: string,
  firstname: string,
  age: string,
  status_animal: string,
}

type event = {
  body: string,
}

type Result = {
  code: string,
  message: string
}

export default async (event : event): Promise<Result> => {
  const dynamodb = new DynamoDB.DocumentClient();
  const {type , firstname , age, status_animal}  = JSON.parse(event.body)

  const SK: string = `#${type}#${firstname}`.toUpperCase()
  const PK: string = `#CREATE-${type}#${uuidv4()}`.toUpperCase()

  const newAnimal: newAnimal = { PK, SK, type, firstname, age , status_animal}
  
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
