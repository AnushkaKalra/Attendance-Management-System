import boto3
import json
import logging
from decimal import Decimal
from botocore.exceptions import ClientError

logger = logging.getLogger()        # Setting up logging for easier record monitoring and debugging
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    # Logging the incoming event details
    logger.info('Received event: %s', json.dumps(event))
    
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('TABLE_NAME')    # Details hidden for security reasons

        # Retrieving the records after scanning the table
        response = table.scan()
        items = response.get('Items', [])

        if not items:
            logger.warning('No records found in the table.')
            return create_response(404, 'No records found.', None)

        # Filtering out items without the Timestamp attribute
        items_with_timestamp = [item for item in items if 'Timestamp' in item]

        if not items_with_timestamp:
            logger.warning('No records with Timestamp found.')
            return create_response(404, 'No records with Timestamp found.', None)

        # Finding the item with the latest Timestamp
        latest_item = max(items_with_timestamp, key=lambda x: x['Timestamp'])

        # Converting the DynamoDB record to a JSON-serializable format
        latest_item_serializable = convert_to_json_serializable(latest_item)
        
       
        logger.info('Latest record: %s', json.dumps(latest_item_serializable, indent=2))
        
        return create_response(200, 'Latest record retrieved successfully.', latest_item_serializable)
        
    except ClientError as e:
        logger.error('ClientError occurred: %s', e.response['Error']['Message'])
        return create_response(500, 'Internal server error.', None)
    except Exception as e:
        logger.error('An error occurred: %s', str(e))
        return create_response(500, 'Internal server error.', None)

def convert_to_json_serializable(item):     # Function to convert DynamoDB record to a JSON-serializable format
    if isinstance(item, list):
        return [convert_to_json_serializable(i) for i in item]
    elif isinstance(item, dict):
        return {k: convert_to_json_serializable(v) for k, v in item.items()}
    elif isinstance(item, Decimal):
        if item % 1 == 0:
            return int(item)
        else:
            return float(item)
    else:
        return item

def create_response(status_code, message, data):    # Function to create JSON response
    response_body = {
        'statusCode' : status_code,
        'message': message + '\n',
        'data': data
    }
    return {
        'statusCode': status_code,
        'message': message,
        'body': json.dumps(response_body)
    }
