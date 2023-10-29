import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:smart_attendance_system/screens/login.dart';

class SplashScreen extends StatefulWidget {
  @override
  SplashScreenState createState() => SplashScreenState();
}

class SplashScreenState extends State<SplashScreen>{


  @override
  void initState(){
    Timer(Duration(seconds:3), () {
        Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context){
              return LoginScreen();
            },));
    });
    super.initState();
  }
  Widget build(BuildContext context){
    return Scaffold(
      body:Container(
        child: Padding(
          padding: const EdgeInsets.all(50.0),
          child: Padding(
            padding: const EdgeInsets.only(top:100.0),
            child: Column(
              children:[
                Center(
                  child: Image.asset(
                  'images/logo.png',height: 600.0,width: 400.0,),
                ),
                LoadingAnimationWidget.discreteCircle(color: CupertinoColors.systemTeal, size: 60),
              ],
            ),
          ),
        ),
      ),
    );
  }
}