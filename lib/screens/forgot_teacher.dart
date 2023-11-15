import 'package:flutter/material.dart';
import 'package:smart_attendance_system/screens/login_teacher.dart';
import 'package:smart_attendance_system/screens/login_teacher.dart';
import 'dart:developer';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';



class ForgotTeacherScreen extends StatefulWidget{
  const ForgotTeacherScreen({super.key});
  @override
  ForgotTeacherScreenState createState()=>ForgotTeacherScreenState();

}

class ForgotTeacherScreenState extends State<ForgotTeacherScreen>{
  FocusNode myfocus = FocusNode();
  final formKey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  final emailFocusNode = FocusNode();
  TextEditingController passwordController=TextEditingController();
  final passwordFocusNode=FocusNode();
  TextEditingController repasswordController=TextEditingController();
  final repasswordFocusNode=FocusNode();


  String extractUsernameFromEmail(String email) {
    List<String> parts = email.split('@');
    if (parts.length == 2) {
      return parts[0];
    } else {
      throw FormatException('Invalid email format');
    }
  }
  void forgot() async{
    String email=emailController.text.trim();
    String passwd=passwordController.text.trim();
    String repasswd=repasswordController.text.trim();
    String username = extractUsernameFromEmail(email);
    print('Username: $username');

    if(email=="" || passwd=="" || repasswd==""){
      Fluttertoast.showToast(
          msg: 'Please fill all the fields',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Color(0xFFF3E5F5),
          textColor: Colors.black
      );
    }else if(passwd!=repasswd){
      Fluttertoast.showToast(
          msg: 'Password does not match',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: Color(0xFFF3E5F5),
          textColor: Colors.black
      );
    }

    else{
      try{
        await FirebaseAuth.instance.sendPasswordResetEmail(email: email);
        Map<String, dynamic> newUserData = {
          "password": "$passwd"
        };
        Fluttertoast.showToast(
            msg: 'Password reset',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
            backgroundColor: Color(0xFFF3E5F5),
            textColor: Colors.black
        );
        await FirebaseFirestore.instance.collection("teachers").doc(
            "$username ipec").update(newUserData).then((value)=>Navigator.of(context).pop());
      }on FirebaseAuthException catch(ex){
        log(ex.code.toString());
      }
    }
  }

  var isObscured;
  @override
  void initState() {
    super.initState();
    isObscured = true;
  }

  @override
  void dispose() {
    super.dispose();
    emailController.dispose();

  }

  @override
  Widget build (BuildContext context){
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SingleChildScrollView(
          physics: ClampingScrollPhysics(),
          child: Form(
            key: formKey,
            child: Padding(
                padding: EdgeInsets.only(top: 80),
                child: Column(
                  children: [
                    Text('Password Reset',style:TextStyle(fontSize:40,color: Color(0xFF651FFF),fontWeight: FontWeight.bold)),
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
                      height: 20,
                    ),

                    ConstrainedBox(
                      constraints: BoxConstraints.tight(const Size(365,50)),
                      child: TextFormField(
                        obscureText: isObscured,
                        focusNode: passwordFocusNode,
                        keyboardType: TextInputType.visiblePassword,
                        controller: passwordController,
                        decoration: InputDecoration(

                          hintText: 'Enter your new password',
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
                      height: 20,
                    ),


                    ConstrainedBox(
                      constraints: BoxConstraints.tight(const Size(365,50)),
                      child: TextFormField(
                        obscureText: isObscured,
                        focusNode: repasswordFocusNode,
                        keyboardType: TextInputType.visiblePassword,
                        controller: repasswordController,
                        decoration: InputDecoration(

                          hintText: 'Confirm your password',
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
                            repasswordFocusNode.requestFocus();
                            return 'Please enter some text';
                          }
                          if (value.length < 6) {
                            repasswordFocusNode.requestFocus();
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
                          backgroundColor: MaterialStatePropertyAll<Color>(Color(0xFF651FFF),),),
                        onPressed: (){
                          forgot();


                        }, child: Text('Submit',style:TextStyle(color:Colors.white,fontSize: 17,fontWeight: FontWeight.bold)),),
                    ),

                  ],
                )),
          ),
        ),
      ),


    );
  }
}

