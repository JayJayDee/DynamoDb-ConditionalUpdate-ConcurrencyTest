# DynamoDB-ConditionalUpdate-ConcurrencyTest
An example for DynamoDB atomic update, written with node.js + typescript.

# What does this example for?
This is an example of atomic update in [AWS DynamoDB, DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html).

The DynamoDB table structure used in this example is as follows.
```
Partition Key: user_id (number)
Field: star_count (number)
```
In this example, let's assume that there is a fixed maximum and there are many requests to increase the `star_count` beyond the maximum. I set `max_star` to 5.

# How to run
Before run the command, you have to prepare your AWS credential to use DynamoDB. you can prepare your credential as a [dotenv](https://github.com/motdotla/dotenv) format in project root. 

Following is the example of `.env` file.
```
AWS_ACCESS_KEY_ID=AKIAZUDMTJSMISVZP37O
AWS_SECRET_ACCESS_KEY=****
DYNAMODB_TABLE_NAME=TABLE_NAME
```
And you can run tests via following commands.
```bash
npm install
npm run test
```
