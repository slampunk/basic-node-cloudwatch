# Simple logging

This is an example of a simple console application that logs to AWS Cloudwatch.

## AWS Setup
* IAM
	* Create an IAM user in AWS, called say `userLogger`.
	* Add the `CloudWatchFullAccess` permission to the newly created `userLogger`.
	* Head over to the `Access Management -> Users` section in the left navigation panel.
	* Choose your newly created user `userLogger`.
	* In the main window, choose the `Security Credentials` tab.
	* Under `Access Keys`, choose `Create access keys`.
	* Note the `Access key id` and the `Secret access key`.
* CloudWatch
	* Create a log group, say `simple-logging`

## NodeJS setup
```
export AWS_REGION=your-aws-region
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-key
```
Run the application with
> node index.js

...and see the logs display within CloudWatch.
