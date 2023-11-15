import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter/cupertino.dart';
import 'package:smart_attendance_system/screens/sign_teacher.dart';
import 'package:smart_attendance_system/screens/forgot_teacher.dart';
import 'package:smart_attendance_system/screens/home_teacher.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'dart:developer';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';



class LoginTeacherScreen extends StatefulWidget {
  LoginTeacherScreen({super.key});
  @override
  LoginTeacherScreenState createState() => LoginTeacherScreenState();
}

class LoginTeacherScreenState extends State<LoginTeacherScreen> {
  late SharedPreferences prefs;
  FocusNode myfocus = FocusNode();
  final formKey = GlobalKey<FormState>();
  TextEditingController passWordController = TextEditingController();
  final passwordFocusNode = FocusNode();
  TextEditingController emailController = TextEditingController();
  final emailFocusNode = FocusNode();

  void login() async {
    String email = emailController.text.trim();
    String password = passWordController.text.trim();

    if (email == "" || password == "") {
      Fluttertoast.showToast(
          msg: 'Please fill all the fields',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Color(0xFFF3E5F5),
          textColor: Colors.black
      );
    } else {
      try {
        UserCredential userCredential = await FirebaseAuth.instance
            .signInWithEmailAndPassword(email: email, password: password);
      print(userCredential);
        if (userCredential.user != null) {
          await prefs.setString("username", email);
          await prefs.setString('logged in', 'login_teacher');

          Fluttertoast.showToast(
              msg: 'Logged in successfully',
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.BOTTOM,
              backgroundColor: Color(0xFFF3E5F5),
              textColor: Colors.black
          );

          Navigator.popUntil(context, (route) => route.isFirst);
          Navigator.pushReplacement(
              context, MaterialPageRoute(builder: (context) => HomeTeacherScreen()));
        }
      } on FirebaseAuthException catch (ex) {
        if (ex.code=='INVALID_LOGIN_CREDENTIALS'){
          log(ex.code);
          Fluttertoast.showToast(
            msg: 'Invalid Login Credentials',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            backgroundColor: Color(0xFFF3E5F5),
            textColor: Colors.black,

          );

        }
      }
    }
  }

  var isObscured;
  @override
  void initState() {
    super.initState();
    isObscured = true;
    getter();
  }

  Future getter() async{
    prefs = await SharedPreferences.getInstance();
  }

  @override
  void dispose() {
    super.dispose();
    emailController.dispose();
    passWordController.dispose();
  }

  Widget build(BuildContext context) {



      return Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: SingleChildScrollView(
            physics: ClampingScrollPhysics(),
            child: Form(
              key: formKey,
              child: Padding(
                  padding: EdgeInsets.only(top: 120),
                  child: Column(
                    children: [
                      Center(child: Image.asset('images/teacher.png',height: 250,width: 250,)),
                      SizedBox(
                        height: 20,
                      ),
                      Center(child: Text('Sign In As Faculty',style:TextStyle(fontWeight: FontWeight.bold,fontSize: 23))),
                      SizedBox(
                        height: 30,
                      ),
                      ConstrainedBox(
                        constraints: BoxConstraints.tight(const Size(365,50)),
                        child: TextFormField(

                          focusNode: emailFocusNode,
                          keyboardType: TextInputType.emailAddress,
                          controller: emailController,
                          decoration: InputDecoration(
                            fillColor: Color(0xFFccb9f7),
                            hintText: 'Enter your College Email-Id',
                            icon: Icon(Icons.mail),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              emailFocusNode.requestFocus();
                              return 'Please enter an email';
                            }
                          },
                        ),
                      ),
                      SizedBox(
                          height:10
                      ),
                      ConstrainedBox(
                        constraints: BoxConstraints.tight(const Size(365,50)),
                        child: TextFormField(
                          obscureText: isObscured,
                          focusNode: passwordFocusNode,
                          keyboardType: TextInputType.visiblePassword,
                          controller: passWordController,
                          decoration: InputDecoration(

                            hintText: 'Enter Your Password',
                            icon: Icon(Icons.lock),
                            suffixIcon: IconButton(

                              padding: EdgeInsetsDirectional.only(end: 12.0),
                              icon: isObscured
                                  ? Icon(Icons.visibility)
                                  : Icon(Icons.visibility_off),
                              onPressed: () {
                                setState(() {
                                  isObscured = !isObscured;
                                });
                              },
                            ),
                          ),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              passwordFocusNode.requestFocus();
                              return 'Please enter some text';
                            }
                            if (value.length < 6) {
                              passwordFocusNode.requestFocus();
                              return 'Password must be atleast 6 characters';
                            }
                          },
                        ),
                      ),
                      SizedBox(
                        height: 40,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left:20.0),
                        child: TextButton(
                          style: ButtonStyle(
                            fixedSize: MaterialStateProperty.all(Size(330,50)),
                            backgroundColor: MaterialStatePropertyAll<Color>(Color(0xFF651FFF),),
                          ),
                          onPressed: (){
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => SignTeacherScreen()),
                            );
                          }, child: Text('New User',style:TextStyle(color: Colors.white,fontSize: 17,fontWeight: FontWeight.bold)),),
                      ),
                      SizedBox(
                        height: 25,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left:20.0),
                        child: TextButton(
                          style: ButtonStyle(
                            fixedSize: MaterialStateProperty.all(Size(330,50)),
                            backgroundColor: MaterialStatePropertyAll<Color>(Color(0xFF651FFF),),),
                          onPressed: (){
                            login();
                          }, child: Text('Log In',style:TextStyle(color:Colors.white,fontSize: 17,fontWeight: FontWeight.bold)),),
                      ),
                      SizedBox(
                        height: 25,
                      ),
                      TextButton(
                        onPressed: (){

                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => ForgotTeacherScreen()),
                          );
                        },
                        child: Text('Forgot Your Password ?',style: TextStyle(color: Color(0xFF311B92 ),fontSize: 15,fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  )),
            ),
          ),
        ),

    );
  }
}

//fillColor: Color(0xFF7E57C2),
