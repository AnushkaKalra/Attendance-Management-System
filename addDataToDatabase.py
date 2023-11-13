import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://attendance-system-a10eb-default-rtdb.asia-southeast1.firebasedatabase.app/"
})

ref = db.reference('students')

data = {
    "2003010040 ipec":
        {
            "Name": "Anushka Kalra",
            "Year": 4,
            "Section": "A",
            "College_email": "2003010040@ipec.org.in",
            "Univ_rollno": 2000300100041,
            "Degree": "B.Tech",
            "Department": "CSE",
            "Mobile": 9123906590,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003010167 ipec":
        {
            "Name": "Reva Teotia",
            "Year": 4,
            "Section": "C",
            "College_email": "2003010167@ipec.org.in",
            "Univ_rollno": 2000300100176,
            "Degree": "B.Tech",
            "Department": "CSE",
            "Mobile": 93129076890,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003010181 ipec":
        {
            "Name": "Samana Butool Mirza",
            "Year": 4,
            "Section": "C",
            "College_email": "2003010181@ipec.org.in",
            "Univ_rollno": 2000300100189,
            "Degree": "B.Tech",
            "Department": "CSE",
            "Mobile": 9122390765,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003010186 ipec":
        {
            "Name": "Sanskriti Mamgain",
            "Year": 4,
            "Section": "C",
            "College_email": "2003010186@ipec.org.in",
            "Univ_rollno": 2000300100194,
            "Degree": "B.Tech",
            "Department": "CSE",
            "Mobile": 9310215416,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003010194 ipec":
        {
            "Name": "Shakshi Singh",
            "Year": 4,
            "Section": "D",
            "College_email": "2003010194@ipec.org.in",
            "Univ_rollno": 2000300100203,
            "Degree": "B.Tech",
            "Department": "CSE",
            "Mobile": 9412340965,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003011003 ipec":
        {
            "Name": "Abhishek Singh",
            "Year": 4,
            "Section": "A",
            "College_email": "2003011003@ipec.org.in",
            "Univ_rollno": 2000301530003,
            "Degree": "B.Tech",
            "Department": "AIML",
            "Mobile": 9340976534,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003031035 ipec":
        {
            "Name": "Nimish Narula",
            "Year": 4,
            "Section": "A",
            "College_email": "2003031035@ipec.org.in",
            "Univ_rollno": 2000300310034,
            "Degree": "B.Tech",
            "Department": "ECE",
            "Mobile": 9312234509,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2003040007 ipec":
        {
            "Name": "Ansh Singh",
            "Year": 4,
            "Section": "A",
            "College_email": "2003040007@ipec.org.in",
            "Univ_rollno": 2000300400007,
            "Degree": "B.Tech",
            "Department": "ME",
            "Mobile": 9123407699,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2103031009 ipec":
        {
            "Name": "Prakhar Bhatnagar",
            "Year": 3,
            "Section": "A",
            "College_email": "2103031009@ipec.org.in",
            "Univ_rollno": 2100300310010,
            "Degree": "B.Tech",
            "Department": "ECE",
            "Mobile": 9043407659,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
    "2130153021 ipec":
        {
            "Name": "Chinmay Pundir",
            "Year": 3,
            "Section": "A",
            "College_email": "2130153021@ipec.org.in",
            "Univ_rollno": 2100301530026,
            "Degree": "B.Tech",
            "Department": "AIML",
            "Mobile": 94729076880,
            "Extras": 0,
            "Lecture_number": [1,2,3,4,5,6,7,8],
            "Last_attendance_time": "2022-12-11 00:54:34",
            "Total_attendance": 7,
        },
}

for key, value in data.items():
    ref.child(key).set(value)
