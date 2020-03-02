import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,Button} from 'react-native';
import NewImageUpload from "./src/Component/NewImageUpload";
import axios from 'axios';
import ImageList from "./src/Component/eachImageComponent/ImageList";
const Url='http://192.168.0.102:3000';

export default class App extends Component{
    constructor(){
        super();
        this.state={
            imageUploads:[]
        }
    }
    _renderFillerImage(){
        var arr=[];
        for(var i=this.state.imageUploads.length;i<4;i++){
            arr.push(
                <Image
                    key={'filler-image_'+i}
                    source={{uri: Url+'/images/multimedia/no-image.png'}}
                    style={{ width: 70, height: 70}}
                />
            )
        }
        return arr;
    }
    _renderImageList(){
        var arr=[];
        var data=this.state.imageUploads;
        for(var i=0;i<data.length;i++){
            arr.push(
                <ImageList
                    key={'images_list-'+i}
                    data={data[i]}
                    allData={this.state.imageUploads}
                    updateRootState={this._handleUpdateIndexState}
                />
            )
        }
        return arr;
    }
    _handleUpdateIndexState=(name,value)=>{
      this.setState({[name]:value});
    };
    _signIn(e){
        e.preventDefault();
        var json_data= {
            userid:"shroud@mail.com",
            pwd:"qwerty123"
        };
        axios.post(Url+"/api/login",json_data).then(res=>{
            console.log("check this--->",res.data.uid);
        }).catch(err=>{
            console.log(err.response);
        });
    }
    render() {
        return (
            <View style={{padding:10}}>
            <View style={styles.rowSt}>
                <View style={{flex:1}}>
                    <Text style={{fontWeight:'bold'}}>Images</Text>
                </View>
                <View style={{flex:4}}>
                    <View style={styles.myCard}>
                        <View style={{flexDirection:'row',flexWrap: "wrap"}}>
                            {this._renderImageList()}
                            {this._renderFillerImage()}
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                {this.state.imageUploads.length < 5?
                                    <NewImageUpload
                                        imageUpload={this.state.imageUploads}
                                        upDateIndexState={this._handleUpdateIndexState}
                                    />
                                    :null}
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
                        </View>
                    </View>
                </View>
            </View>
                <Button title={"signin"} onPress={this._signIn}/>
            </View>
        );
    }

}

const styles=StyleSheet.create({
    rowSt:{
        flexDirection:'row',
        marginTop:10
    },
    SelectCont:{
        borderWidth:1,
        borderColor:'grey',
        height: 100
    },
    myCard:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        padding:10,
        marginBottom:10
    },
});