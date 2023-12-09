import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:smart_attendance_system/screens/login_teacher.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:developer';
import 'package:smart_attendance_system/screens/register.dart';
import 'package:smart_attendance_system/screens/profile_teacher.dart';
import 'package:smart_attendance_system/screens/mark_attendance.dart';

class HomeTeacherScreen extends StatefulWidget {
  HomeTeacherScreen({super.key});
  @override
  HomeTeacherScreenState createState() => HomeTeacherScreenState();
}

class HomeTeacherScreenState extends State<HomeTeacherScreen> {
  String email = "";
  String username = "";
  String total = "";
  String extractUsernameFromEmail(String email) {
    List<String> parts = email.split('@');
    if (parts.length == 2) {
      return parts[0];
    } else {
      throw FormatException('Invalid email format');
    }
  }

  loadUserInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    email = (prefs.getString('username') ?? "");
    username = extractUsernameFromEmail(email);
    total = await FirebaseFirestore.instance
        .collection('teachers')
        .doc("$username ipec")
        .get()
        .then((value) {
      return value.get('Name');
    });
    log(total);
  }

  void logout() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove("logged in");
    await FirebaseAuth.instance.signOut();
    Navigator.popUntil(context, (route) => route.isFirst);
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LoginTeacherScreen()));
  }

  @override
  void initState() {
    super.initState();
    setState(() {
      loadUserInfo();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(31, 116, 206, 2),
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(18,22,108,2),
        automaticallyImplyLeading: false,
        title: Center(child: Text('Home',style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontSize: 25),)),
        actions: [
          IconButton(
            onPressed: () {
              logout();
            },
            icon: Icon(Icons.exit_to_app,color:Colors.white),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: [
            Container(
              alignment: Alignment.topLeft,
              child: Text('Hello',
                  style: TextStyle(
                      fontSize: 35,
                      fontWeight: FontWeight.bold,
                      color: Colors.white)),
            ),
            Container(
              alignment: Alignment.topLeft,
              child: Text(
                total,
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 40,
                    color: Colors.white),
              ),
            ),
            SizedBox(
              height: 120,
            ),
            Padding(
              padding: EdgeInsets.only(left: 90.0),
              child: Row(
                children: [
                  Column(
                    children: [
                      GestureDetector(
                        onTap: (){
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return ProfileTeacherScreen();
                              },
                            ),
                          );
                        },
                        child: Column(
                          children: [
                            Icon(
                              Icons.assignment_ind_outlined,
                              size: 70,
                              color: Colors.white,
                            ),
                            Text(
                              'Profile',
                              style: TextStyle(fontSize: 20, color: Colors.white),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 50,
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return RegisterScreen();
                              },
                            ),
                          );
                        },
                        child: Column(
                          children: [
                            Icon(
                              Icons.edit_calendar,
                              size: 70,
                              color: Colors.white,
                            ),
                            Column(
                              children: [
                                Text(
                                  'Register',
                                  style: TextStyle(
                                      fontSize: 20, color: Colors.white),
                                ),
                                Text(
                                  'Student',
                                  style: TextStyle(
                                      fontSize: 20, color: Colors.white),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    width: 50,
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 10.0),
                    child: GestureDetector(
                      onTap: (){
                        Navigator.pushReplacement(context,
                        MaterialPageRoute(builder: (context){
                          return MarkAttendanceScreen();
                            },),);
                      },
                      child: Column(
                        children: [
                          Icon(
                            Icons.edit_calendar,
                            size: 70,
                            color: Colors.white,
                          ),
                          Column(
                            children: [
                              Text(
                                'Mark',
                                style:
                                    TextStyle(fontSize: 20, color: Colors.white),
                              ),
                              Text(
                                'Attendance',
                                style:
                                    TextStyle(fontSize: 20, color: Colors.white),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 30,
            ),
          ],
        ),
      ),
    );
  }
}
