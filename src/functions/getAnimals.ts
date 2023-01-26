import { DynamoDB } from "aws-sdk";
import { Item } from "aws-sdk/clients/simpledb";

type event = {
  body: string;
};

type Result = {
  code: string;
  message: string | any ;
};
export default async (event: event): Promise<Result> => {
  const dynamodb = new DynamoDB.DocumentClient();

  const result = await dynamodb.scan({
    TableName: "RegAnimal",
  }).promise();

  const tasks = result.Items;
  return {
    code: '200',
    message: tasks,
  };
};
