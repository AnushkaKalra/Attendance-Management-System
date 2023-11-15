import 'dart:async';
import 'package:smart_attendance_system/screens/select.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:smart_attendance_system/screens/login_teacher.dart';

class SplashScreen extends StatefulWidget {
  @override
  SplashScreenState createState() => SplashScreenState();
}

class SplashScreenState extends State<SplashScreen>{


  @override
  void initState(){
    Timer(Duration(seconds:6), () {
        Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context){
              return SelectScreen();
            },));
    });
    super.initState();
  }
  Widget build(BuildContext context){
    return Scaffold(
      body:Container(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Padding(
            padding: const EdgeInsets.only(top:70.0),
            child: Column(
              children:[
                Row(
                  children: [
                    Image.asset("images/logo.png",width:110,height:110),
                    SizedBox(
                      width: 5,
                    ),
                Text("Attendance Portal",style:TextStyle(fontSize: 28,fontWeight: FontWeight.bold)),],),
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Image.asset(
                  'images/smart.jpeg',height: 460,width:460),
                ),
                SizedBox(
                  height: 50,
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