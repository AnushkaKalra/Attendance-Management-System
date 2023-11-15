import 'package:flutter/material.dart';
import 'package:smart_attendance_system/screens/home_student.dart';
import 'package:smart_attendance_system/screens/home_teacher.dart';
import 'screens/splash.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'dart:developer';
import 'auth_service.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'screens/select.dart';


late SharedPreferences prefs;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  prefs = await SharedPreferences.getInstance();


  runApp(MyApp());
}
class MyApp extends StatelessWidget {

  final AuthService _authService=AuthService();

  //const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    String? start=prefs.getString('logged in');
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(

        useMaterial3: true,
      ),
      //home: (FirebaseAuth.instance.currentUser==null)?SplashScreen():isS,
           home: (FirebaseAuth.instance.currentUser!=null)?start!=null?start=="login_student"?HomeStudentScreen():HomeTeacherScreen():SplashScreen():SplashScreen(),



    );
  }
}


