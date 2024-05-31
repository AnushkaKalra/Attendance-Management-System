import boto3
import json
from datetime import datetime
import pytz
from decimal import Decimal
from urllib.parse import unquote_plus

s3_client = boto3.client('s3')
rekognition_client = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
sns_client = boto3.client('sns')
table = dynamodb.Table('TBALE_NAME')    # Details hidden for security reasons

def lambda_handler(event, context):
    status_code = 200
    messages = []

    for record in event['Records']:     # Processing each record in the event
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        if key.startswith('public/'):
            message, code = process_image(bucket, key)
            messages.append(message)
            if code != 200:
                status_code = code

    if status_code == 200:
        sns_client.publish(
            TopicArn='arn:aws:sns:REGION:AWS_ACCOUNT_ID:SNS_TOPIC',    # Details hidden for security reasons
            Message="Your today's attendance has been marked",         # SNS notification body
            Subject="Attendance Notification"                          # SNS notification subject
        )

    return {
        'statusCode': status_code,
        'body': json.dumps({'messages': messages})
    }

def process_image(bucket, key):     # Function to process image
    try:
        # Checking  if the object exists and is accessible
        s3_client.head_object(Bucket=bucket, Key=key)
        
        response = rekognition_client.search_faces_by_image(
            CollectionId='studentfaces',
            Image={'S3Object': {'Bucket': bucket, 'Name': key}},
            MaxFaces=1,
            FaceMatchThreshold=90
        )

        if response['FaceMatches']:
            face_id = response['FaceMatches'][0]['Face']['FaceId']
            update_message, update_code = update_dynamodb(face_id)
            return update_message, update_code
        else:
            return f"No faces matched or detected in image: {key}", 400
    except s3_client.exceptions.NoSuchKey:
        error_message = f"Object {key} not found in bucket {bucket}."
        print(error_message)
        return error_message, 404
    except Exception as e:
        error_message = f"Error processing image {key} from bucket {bucket}: {e}"
        print(error_message)
        return error_message, 500

def update_dynamodb(face_id):       # Function to update corresponding records in DynamoDB after face recognition is successful
    try:
        timestamp = datetime.now(pytz.timezone('Asia/Kolkata')).strftime('%Y-%m-%d %H:%M:%S')
        current_date = datetime.now(pytz.timezone('Asia/Kolkata')).date()
        existing_item = table.get_item(Key={'rekognitionId': face_id})
        last_attendance_date_str = existing_item['Item'].get('Previous Attendance Date', None)
        
        if last_attendance_date_str:
            last_attendance_date = datetime.strptime(last_attendance_date_str, '%Y-%m-%d').date()
            days_difference = (current_date - last_attendance_date).days
        else:
            days_difference = 1
        
        if str(current_date) != last_attendance_date_str:
            presentDays = existing_item['Item'].get('Total Present Days', 0) + 1
            workingDays = existing_item['Item'].get('Total Working Days', 0) + days_difference
        
            table.update_item(
                Key={'rekognitionId': face_id},
                UpdateExpression='SET #as = :val1, #ts = :val2, #dp = :val3, #twd = :val4, #lad = :val5',
                ExpressionAttributeNames={
                    '#as': 'Attendance Status',
                    '#ts': 'Timestamp',
                    '#dp': 'Total Present Days',
                    '#twd': 'Total Working Days',
                    '#lad': 'Previous Attendance Date'
                },
                ExpressionAttributeValues={
                    ':val1': True,
                    ':val2': timestamp,
                    ':val3': presentDays,
                    ':val4': workingDays,
                    ':val5': str(current_date)
                }
            )
        else:
            table.update_item(
                Key={'rekognitionId': face_id},
                UpdateExpression='SET #ts = :val2',
                ExpressionAttributeNames={'#ts': 'Timestamp'},
                ExpressionAttributeValues={':val2': timestamp}
            )
            
        success_message = f"Attendance updated successfully for face ID: {face_id}"
        print(success_message)
        return success_message, 200
    except Exception as e:
        error_message = f"Error updating DynamoDB for face ID {face_id}: {e}"
        print(error_message)
        return error_message, 500

def notify_students():
    try:
        # Scanning the DynamoDB table to get email addresses of all students
        response = table.scan()
        items = response.get('Items', [])
        emails = [item['Email'] for item in items if 'Email' in item]

        # Sending SNS notification to each email
        for email in emails:
            sns_client.publish(
                TopicArn='arn:aws:sns:REGION:AWS_ACCOUNT_ID:SNS_TOPIC',    # Details hidden for security reasons,
                Message='Your today\'s attendance has been marked.',       # SNS notification body
                Subject='Attendance Notification',                         # SNS notification subject
                MessageStructure='string',
                MessageAttributes={
                    'email': {
                        'DataType': 'String',
                        'StringValue': email
                    }
                }
            )
        print("Notifications sent to all students.")
    except Exception as e:
        print(f"Error sending notifications: {e}")
