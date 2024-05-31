import boto3
import time

s3 = boto3.client('s3')
rekognition = boto3.client('rekognition', region_name = 'ap-south-1')
dynamodbTableName = 'TABLE_NAME'        # Details hidden for security reasons
dynamodb = boto3.resource('dynamodb', region_name = 'ap-south-1')
studentTable = dynamodb.Table(dynamodbTableName)

def lambda_handler(event, context):
    print(event)
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    print(key)

    try:
        response = index_student_image(bucket, key)
        print(response)
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            faceId = response['FaceRecords'][0]['Face']['FaceId']
            name = key.split('.')[0].split('_')
            firstName = name[0]
            lastName = name[1]
            uni_rollnumber = int(name[2])
            register_student(faceId, firstName, lastName, uni_rollnumber)
        return response
    except Exception as e:
        print(e)
        print('Error processing Student image {} from bucket{}.'.format(key,bucket))
        raise e
    
def index_student_image(bucket, key):
    response = rekognition.index_faces(
        Image = {
                'S3Object':
                {
                    'Bucket': bucket,
                    'Name': key
            }
        },
        CollectionId = "studentfaces"   # AWS Rekognition Collection
    )
    return response

# Function to register students
def register_student(faceId, firstName, lastName, uni_rollnumber, workingDays = 0, presentDays = 0, timestamp = None, lastDate = None):
    studentTable.put_item(
        Item = {
            'rekognitionId': faceId,
            'First Name': firstName,
            'Last Name': lastName,
            'Attendance Status': False,
            'Timestamp': timestamp if timestamp else "",
            'uni_rollnumber': uni_rollnumber,
            'Total Working Days': workingDays,
            'Total Present Days': presentDays,
            'Previous Attendance Date': lastDate
        }
    )

