import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'login.dart';

class HomeScreen extends StatefulWidget{
  HomeScreen({super.key});
  @override
  HomeScreenState createState()=>HomeScreenState();
}

class HomeScreenState extends State<HomeScreen>{

  void logout() async{
    await FirebaseAuth.instance.signOut();
    Navigator.popUntil(context, (route) => route.isFirst);
    Navigator.pushReplacement(context,
        MaterialPageRoute(builder: (context)=>LoginScreen()));
  }
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        automaticallyImplyLeading: false,
        title:Text('Home'),
        actions: [
          IconButton(onPressed: (){
            logout();
          }, icon: Icon(Icons.exit_to_app),
          ),
        ],
      ),
    );
  }
}

