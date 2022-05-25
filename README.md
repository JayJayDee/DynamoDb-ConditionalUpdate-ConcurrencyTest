# DynamoDB-ConditionalUpdate-ConcurrencyTest
An example for DynamoDB atomic update, written with node.js + typescript.

# What does this example for?
This is an example of atomic update in [AWS DynamoDB, DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html).

The DynamoDB table structure used in this example is as follows.
```
Partition Key: user_id (number)
Field: star_count (number)
```
Let's assume that there is a fixed maximum and there are many requests to increase the `star_count` beyond the maximum. I set `max_star` to 5. And Let's assume that the max_star value should not exceed 5 in this situation.
In this situation, if the application does `get()` - max_star check - `put()` on each request, max_star will exceed 5.
Instead, if you perform atomic, conditional `update()` on max_star, you can guarantee that max_star does not exceed 5 even if there are many requests.
This example shows how to perform atomic conditional update in a similar scenario.

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
