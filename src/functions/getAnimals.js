const { DynamoDB } = require("aws-sdk");

module.exports = async () => {
    const dynamodb = new DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'RegAnimal',
    }).promise()
    
    const tasks = result.Items
    return {
        status: 200,
        body: tasks
    }
}