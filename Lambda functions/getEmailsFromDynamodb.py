import boto3
import json
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TABLE_NAME')                             # Details hidden for security reasons
sns_client = boto3.client('sns')
sns_topic_arn = 'arn:aws:sns:REGION:AWS_ACCOUNT_ID:SNS_TOPIC'    # Details hidden for security reasons

def get_student_emails():       # Function to retrieve student emails from DynamoDB table
    response = table.scan(
        ProjectionExpression='Email'
    )
    emails = [item['Email'] for item in response['Items'] if 'Email' in item]       
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(
            ProjectionExpression='Email',
            ExclusiveStartKey=response['LastEvaluatedKey']
        )
        emails.extend([item['Email'] for item in response['Items'] if 'Email' in item])

    return emails

def subscribe_emails_to_sns(emails):        # Function to subscribe emails retrieved above to SNS automatically
    for email in emails:
        sns_client.subscribe(
            TopicArn=sns_topic_arn,
            Protocol='email',
            Endpoint=email
        )

def lambda_handler(event, context):
    emails = get_student_emails()
    subscribe_emails_to_sns(emails)
    return {
        'statusCode': 200,
        'body': json.dumps('Emails subscribed successfully.')
    }
