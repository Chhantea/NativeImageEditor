import React,{Component} from 'react';
import {View,Text,StyleSheet,Modal,Button,TouchableHighlight,TouchableOpacity,Alert} from 'react-native';
import ImageUploadButtonLists from "./ImageUploadButtonLists";
import Toast from 'react-native-tiny-toast'
import axios from 'axios';
const Url='http://192.168.0.102:3000';

export default class NewImageUpload extends Component{
    constructor(){
        super();
        this.state={
            imagePickVisible:false
        }
    }
    _handleUploadImage=(valueData)=>{
        this.setState({imagePickVisible:false})
        Toast.showLoading('Loading...');
        var formData= new FormData();
        formData.append('dir','');
        formData.append('file',{
            uri: valueData.uri,
            type: valueData.type,
            name: valueData.fileName
        });
        axios.post(Url+"/api/getimage",formData).then(res=> {
            Toast.hide();
            this._imagePush(res.data)
        }).catch(err=>{
            Toast.hide();
            console.log("error uploadds ===> ",err.response);
            Alert.alert("Error",`Something went wrong ----> ${err.response.data.error}` )
        })
        // this._imageUploadToServer(imgData,valueUrl)

    };
    _imagePush(data){
        var imgData=this.props.imageUpload;
        data.reset=false;
        imgData.push(data);
        Toast.hide();
        this.props.upDateIndexState("imageUploads",imgData);
    }

    render() {
        return (
            <View>
                <Button title={'Add'} onPress={()=>this.setState({imagePickVisible:true})}/>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.imagePickVisible}
                    onRequestClose={() => {
                        this.setState({imagePickVisible:!this.state.imagePickVisible})
                    }}>
                    <TouchableHighlight style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#21252959',
                    }}
                                        onPress={()=>this.setState({imagePickVisible:!this.state.imagePickVisible})}
                    >
                        <View style={styles.boxList}>
                            <Text>Upload Image</Text>
                            <ImageUploadButtonLists
                                updateUpload={this._handleUploadImage}
                            />
                            <TouchableOpacity style={styles.listStyle} onPress={()=>this.setState({imagePickVisible:!this.state.imagePickVisible})}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableHighlight>
                </Modal>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    boxList:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:5,
        padding:10,
        elevation:10,
        width:'80%'
    },
    listStyle:{
        padding:10,
    }
});