import 'package:flutter/material.dart';
import 'package:smart_attendance_system/screens/home_teacher.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:date_format/date_format.dart';
import 'package:intl/intl.dart';
import 'package:smart_attendance_system/screens/camera_screen.dart';

class MarkAttendanceScreen extends StatefulWidget {
  MarkAttendanceScreen({super.key});
  @override
  MarkAttendanceScreenState createState() => MarkAttendanceScreenState();
}

class MarkAttendanceScreenState extends State<MarkAttendanceScreen> {
  List<String> items = ['DAA', 'DS', 'COA', 'CD', 'OS', 'DBMS', 'TAFL'];
  String? selectedItem = 'DAA';
  TextEditingController date = TextEditingController();
  FocusNode dateFocusNode = FocusNode();
  TextEditingController subject = TextEditingController();
  FocusNode subjectFocusNode = FocusNode();
  var isObscured;

  // loadUserInfo() async {
  //   SharedPreferences prefs = await SharedPreferences.getInstance();
  //   email = (prefs.getString('username') ?? "");
  //   username = extractUsernameFromEmail(email);
  //   total = await FirebaseFirestore.instance
  //       .collection('teachers')
  //       .doc("$username ipec")
  //       .get()
  //       .then((value) {
  //     return value.get('Subject_code');
  //   });
  //   log(total);
  // }


  @override
  void initState() {
    super.initState();
    setState(() {
      isObscured = true;
    });
  }

  @override
  void dispose() {
    super.dispose();
    date.dispose();
    subject.dispose();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(31, 116, 206, 2),
      appBar: AppBar(
        backgroundColor: Color.fromRGBO(18, 22, 108, 2),
        automaticallyImplyLeading: false,
        title: Center(
            child: Text(
          'Mark Attendance',
          style: TextStyle(
              color: Colors.white, fontSize: 25, fontWeight: FontWeight.bold),
        )),
      ),
      body: Padding(
        padding: EdgeInsets.all(30),
        child: Column(
          children: [
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Container(
                  child: Text(
                    'Attendance Portal',
                    style: TextStyle(
                        fontSize: 30,
                        color: Colors.white,
                        fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ),
            SizedBox(
              height: 50,
            ),
            Row(
              children: [
                Container(
                  child: Text('Date',
                      style: TextStyle(fontSize: 20, color: Colors.white)),
                ),
                SizedBox(
                  width: 50,
                ),
                ConstrainedBox(
                  constraints: BoxConstraints.tight(const Size(255, 50)),
                  child: TextFormField(
                    style: TextStyle(color: Colors.white),
                    focusNode: dateFocusNode,
                    controller: date,
                    decoration: InputDecoration(
                      enabledBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: Colors.white),
                      ),
                      fillColor: Colors.white,
                      icon: Icon(Icons.calendar_month_rounded,
                          color: Colors.white),
                      hintText: "Select Date",
                      labelStyle: TextStyle(color: Colors.white, fontSize: 15),
                      hintStyle: TextStyle(color: Colors.white),
                    ),
                    onTap: () async {
                      DateTime? pickdate = await showDatePicker(
                          context: context,
                          initialDate: DateTime.now(),
                          firstDate: DateTime(2000),
                          lastDate: DateTime(2101));
                      if (pickdate != null) {
                        setState(() {
                          date.text = DateFormat('yyyy-MM-dd').format(pickdate);
                        });
                      }
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Row(
              children: [
                Container(
                  child: Text('Subject',
                      style: TextStyle(fontSize: 20, color: Colors.white)),
                ),
                SizedBox(
                  width: 20,
                ),
                ConstrainedBox(
                  constraints: BoxConstraints.tight(const Size(255, 50)),
                  child: Row(
                    children: [
                      Icon(
                        Icons.subject_outlined,
                        color: Colors.white,
                      ),
                      SizedBox(
                        width: 15,
                      ),
                      Expanded(
                        child: DropdownButton(
                          isExpanded: true,
                          underline: Container(
                            height: 2,
                            color: Colors.white,
                          ),
                          value: selectedItem,
                          icon: const Icon(
                            Icons.keyboard_arrow_down,
                            color: Colors.white,
                          ),
                          items: items.map((String items) {
                            return DropdownMenuItem(
                              value: items,
                              child: Text(items),
                            );
                          }).toList(),
                          onChanged: (String? newValue) {
                            setState(() {
                              selectedItem = newValue!;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Row(
              children: [
                Container(
                  child: Text('Class',
                      style: TextStyle(fontSize: 20, color: Colors.white)),
                ),
                SizedBox(
                  width: 43,
                ),
                ConstrainedBox(
                  constraints: BoxConstraints.tight(const Size(255, 50)),
                  child: Row(
                    children: [
                      Icon(
                        Icons.co_present,
                        color: Colors.white,
                      ),
                      SizedBox(
                        width: 15,
                      ),
                      Expanded(
                        child: DropdownButton(
                          isExpanded: true,
                          focusColor: Colors.white,
                          underline: Container(
                            height: 2,
                            color: Colors.white,
                          ),
                          value: selectedItem,
                          icon: const Icon(
                            Icons.keyboard_arrow_down,
                            color: Colors.white,
                          ),
                          items: items.map((String items) {
                            return DropdownMenuItem(
                              value: items,
                              child: Text(items),
                            );
                          }).toList(),
                          onChanged: (String? newValue) {
                            setState(() {
                              selectedItem = newValue!;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            ElevatedButton(onPressed: (){
              Navigator.pushReplacement(context,
                MaterialPageRoute(builder: (context){
                  return CameraScreen();
                },),);
            }, child: Container(
              child:Text('Mark Attendance'),
            ),)

          ],
        ),
      ),
    );
  }
}
