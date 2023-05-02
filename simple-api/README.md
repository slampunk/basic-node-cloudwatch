
# Simple api logging

  

This is an example of a simple api application that logs requests to AWS Cloudwatch via middleware.

  

The middleware logs each request to AWS in this format:

```

[METHOD] [URL] [STATUSCODE] [CONTENT-LENGTH] - {RUNNING-TIME-IN-MILLISECONDS}ms

```

Additionally, the following properties are logged as metadata for searching purposes (examples provided):

```json
{
    "method": "GET",
    "url": "http://example.com",
    "statusCode": 200,
    "contentLength": 1823,
    "runningTimeMs": 10.378,
    "traceparent": "W3C compliant traceparent",
    "remoteAddress": "217.18.95.182"
}
```

## AWS Setup

If you have not yet, these are the steps to configure AWS for accepting logs.
* IAM
	* Create an IAM user in AWS, called say `userLogger`.
	* Add the `CloudWatchFullAccess` permission to the newly created `userLogger`.
	* Head over to the `Access Management -> Users` section in the left navigation panel.
	* Choose your newly created user `userLogger`.
	* In the main window, choose the `Security Credentials` tab.
	* Under `Access Keys`, choose `Create access keys`.
	* Note the `Access key id` and the `Secret access key`.

* CloudWatch
	* Create a log group, say `simple-api`

  

## NodeJS setup

```
export AWS_REGION=your-aws-region
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-key
```

Run the application with
> node index.js

## Perform requests :tada:

There are a couple of endpoints readily available for consumption:
```
GET /
GET /handle
POST /handle
```
CloudWatch logs will populate as a result of performing these requests.