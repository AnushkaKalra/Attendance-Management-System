import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class CameraScreen extends StatefulWidget{
  @override
  CameraScreenState createState()=>CameraScreenState();
}

class CameraScreenState extends State<CameraScreen>{
  late CameraController controller;
  late Future<void> initializeControllerFuture;
  @override
  void initState(){
    controller=CameraController(CameraDescription(sensorOrientation: 1,name:'0',lensDirection: CameraLensDirection.back), ResolutionPreset.medium,);
    initializeControllerFuture=controller.initialize();
    super.initState();
  }

  @override
  void dispose(){
    controller.dispose();
    super.dispose();
  }
  Widget build(BuildContext context){
    return Scaffold(
      body:FutureBuilder<void>(builder: ((context,snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return CameraPreview(controller);
        } else {
          return Center(child: CircularProgressIndicator());
        }
      }), future: initializeControllerFuture,),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.white,
        child:Icon(
          Icons.camera_alt,
            color:Colors.black,
        ),
        onPressed: ()async {
          try{
            final image=await controller.takePicture();
            Navigator.of(context).push(MaterialPageRoute(builder: (context)=>PreviewScreen(imagePath: image.path),
            ));
          }
catch(e){}
        },
      ),
    );
  }
}

class PreviewScreen extends StatelessWidget{
  final String imagePath;

  const PreviewScreen({Key? key,required this.imagePath}):super(key:key);

  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        title:Text('Preview'),
      ),
      body:Center(
        child:Image.file(
           File(imagePath),
        ),
      )
    );
  }
}