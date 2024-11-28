import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
    table = dynamodb.Table('TABLE_NAME')        # Details hidden for security reasons

    try:
        response = table.scan()     # Performing Table scan
        items = response['Items']
        print("Scanned items: ", items)

        # Handling pagination for large table
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response['Items'])
            print("Scanned items: ", items)

    except ClientError as error:
        print(f"Error scanning table: {error}")
        return {'message': "Failed to scan table"}

    return {'message': "Table scan completed", 'data': items}