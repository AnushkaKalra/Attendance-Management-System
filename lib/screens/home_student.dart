import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:smart_attendance_system/screens/login_student.dart';
import 'dart:developer';
import 'package:smart_attendance_system/screens/profile_student.dart';

class HomeStudentScreen extends StatefulWidget {
  HomeStudentScreen({super.key});
  @override
  HomeStudentScreenState createState() => HomeStudentScreenState();
}

class HomeStudentScreenState extends State<HomeStudentScreen> {
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
        .collection('students')
        .doc("$username ipec")
        .get()
        .then((value) {
      return value.get('Name');
    });
    log(total);
  }

  void logout() async {
    await FirebaseAuth.instance.signOut();
    Navigator.popUntil(context, (route) => route.isFirst);
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => LoginStudentScreen()));
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
      backgroundColor: Color(0xFF1D1E33),
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        automaticallyImplyLeading: false,
        title: Text('Dashboard'),
        actions: [
          IconButton(
            onPressed: () {
              logout();
            },
            icon: Icon(Icons.exit_to_app),
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
                  GestureDetector(
                    onTap: (){
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return ProfileStudentScreen();
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
                    width: 50,
                  ),
                  Padding(
                    padding: EdgeInsets.only(top:10.0),
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
                              'View',
                              style: TextStyle(fontSize: 20, color: Colors.white),
                            ),
                            Text(
                              'Attendance',
                              style: TextStyle(fontSize: 20, color: Colors.white),
                            ),
                          ],
                        ),
                      ],
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
