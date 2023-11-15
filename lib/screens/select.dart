import 'package:flutter/material.dart';
import 'package:smart_attendance_system/screens/login_student.dart';
import 'package:smart_attendance_system/screens/login_teacher.dart';

class SelectScreen extends StatefulWidget{
  SelectScreen({super.key});
  @override
  SelectScreenState createState()=>SelectScreenState();
}

class SelectScreenState extends State<SelectScreen>{
  @override
  void initState(){
    super.initState();
  }
  @override
  void dispose(){
    super.dispose();
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top:60),
              child: Container(
                child: Center(child: Text('Select Your Role',style: TextStyle(fontWeight: FontWeight.bold,color: Colors.black,fontSize: 30),)),
              ),
            ),
            SizedBox(
              height: 40,
            ),
            Expanded(
                child: Container(
                  width:270,
                  decoration: BoxDecoration(
                    border: Border.all(width:0.1),
                    borderRadius: BorderRadius.all(Radius.circular(50)),
                    boxShadow: [BoxShadow(
                      blurRadius:10,
                      color: Colors.white30,
                    ),],
                  ),
                  child: GestureDetector(

                      onTap: (){
                        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context){
                          return LoginStudentScreen();
                        },),);
                      },
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Image.asset('images/student.png',height: 200,width:260),
                        ),
                        Text('STUDENT',style:TextStyle(fontWeight: FontWeight.bold,fontSize: 20)),

                        ],
            ),
                  ),
                ),),
            SizedBox(
              height: 50,
            ),
            Expanded(
              child: Container(
                width:270,
                decoration: BoxDecoration(
                  border: Border.all(width:0.1),
                  borderRadius: BorderRadius.all(Radius.circular(50)),
                  boxShadow: [BoxShadow(
                    blurRadius:10,
                    color: Colors.white30,
                  ),],
                ),
                child: GestureDetector(
                  onTap: (){
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context){
                      return LoginTeacherScreen();
                    },),);
                  },
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Image.asset('images/teacher.png',height: 190,width:270),
                      ),
                      Text('FACULTY',style:TextStyle(fontWeight: FontWeight.bold,fontSize: 20)),

                    ],
                  ),
                ),
              ),),

          ],
        ),
      ),
    );
  }
}