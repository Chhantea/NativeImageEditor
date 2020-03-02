import React,{Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, Alert} from 'react-native';
const Url='http://192.168.0.102:3000';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';

export default class ImageEditIndex extends Component{
   constructor(){
       super();
       this.state={
           options:''
       }
   }
   // _handleUpdateState=(name,value)=>{
   //   this.setState({[name]:value})
   // };
   _copimgEdit=(e)=>{
       e.preventDefault();
       ImagePicker.openCropper({
           path:  Url+this.props.currentImage.url,
           width: 400,
           height: 400
       }).then(image => {
          var editLoad= Toast.showLoading('Loading...');
           var formData= new FormData();
           formData.append('dir',this.props.currentImage.url);
           formData.append('file',{
               uri: image.path,
               type: image.mime,
               name: 'test.jpg'
           });
           axios.post(Url+"/api/getimage",formData).then(res=> {
               Toast.hide(editLoad);
               var newData = res.data;
               newData.reset=true;
               this._handleUpdateImage(newData,this.props.currentImage)
           }).catch(err=>{
               console.log("error upload ===> ",err.response);
               Toast.hide(editLoad);
           });
       }).catch(err=>{
           console.log(err)
       });
   };
   _handleUpdateImage(item,old_data){
       var items = this.props.allData.slice();
       var index = items.indexOf(old_data);
       items.splice(index, 1, item);
       this.props.updateRootState("imageUploads",items)
   }
   _handleReset=(e)=>{
       e.preventDefault();
       var resetLoad =  Toast.showLoading('Loading...');
       axios.delete(Url+'/api/getimage/reset?file='+ this.props.currentImage.url).then(res=>{
           Toast.hide(resetLoad);
           var newData = res.data;
           newData.reset=false;
           this._handleUpdateImage(newData,this.props.currentImage)
       }).catch(err=>{
           console.log(err.response)
           Toast.hide(resetLoad);
       })
   };
    _onHandleDelete=(e)=>{
        e.preventDefault();
       var delLoad= Toast.showLoading('Loading...');
        axios.delete(Url+"/api/getimage?file="+ this.props.currentImage.url).then(res=>{
            Toast.hide(delLoad);
            this._updateDeleteItems(this.props.currentImage)
        }).catch(err=>{
            alert("error");
            Toast.hide(delLoad);
        });
    };
    _updateDeleteItems(item){
        var items = this.props.allData.slice();
        var index = items.indexOf(item);
        items.splice(index, 1);
        this.props.modalState("modalVisible",false);
        this.props.updateRootState("imageUploads",items);
    }
    render() {
        return (
            <ScrollView style={{marginTop:10,padding:10}}>
                <View style={styles.ImgContent}>
                    <Image
                        source={{uri: Url+this.props.currentImage.url}}
                        style={{ width: '100%', height: '100%', marginRight:5}}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={styles.listButtonSection}>
                    {this.props.currentImage.reset?
                        <TouchableOpacity style={styles.buttonStyle} onPress={this._handleReset}>
                            <Text style={{color:'#2BBBAD',fontWeight:'bold',paddingStart:5,paddingEnd:5}}>Reset</Text>
                        </TouchableOpacity>:null
                    }
                    <TouchableOpacity style={styles.buttonStyle} onPress={this._copimgEdit}>
                        <Text style={{color:'#2BBBAD',fontWeight:'bold',paddingStart:5,paddingEnd:5}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Text style={{color:'#ff4444',fontWeight:'bold',paddingStart:5,paddingEnd:5}} onPress={this._onHandleDelete}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
const styles=StyleSheet.create({
    ImgContent:{
        borderWidth:1,
        borderColor:'#ddd',
        height:400,
        backgroundColor:'#eff5f3',
        justifyContent:'center',
        alignItems:'center'
    },
    listButtonSection:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'#4B515D',
        padding:5
    },
    buttonStyle:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#2BBBAD',
        borderWidth:2,
        padding:5,
        marginEnd:5
    },
    // disbleButton:{
    //     justifyContent:'center',
    //     alignItems:'center',
    //     borderColor:'#00695c',
    //     borderWidth:1,
    //     padding:5,
    //     marginEnd:5
    // }
    deleteButton:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ff4444',
        borderWidth:2,
        padding:5,
        marginEnd:5
    }
});


