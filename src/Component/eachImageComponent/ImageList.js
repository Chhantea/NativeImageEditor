import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image,Modal} from  'react-native';
import ModalHeader from "./ModalHeader";
import ImageEditIndex from "./ImageEdit/ImageEditIndex";
const Url='http://192.168.0.102:3000';
export default class ImageList extends Component{
    constructor(){
         super();
         this.state={
             modalVisible:false
         }
    }
    _updateStates=(name,value)=>{
        this.setState({[name]:value})
    };
    render() {
        return (
            <View style={{marginTop:5}}>
                <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
                   <Image
                       source={{uri: Url+this.props.data.url}}
                       style={{ width: 60, height: 60, marginRight:5}}
                   />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                       this.setState({modalVisible:!this.state.modalVisible})
                    }}
                >
                    <View>
                        <ModalHeader
                            updateState={this._updateStates}
                            title={"Image Configuration"}
                        />
                        <ImageEditIndex
                        currentImage={this.props.data}
                        allData={this.props.allData}
                        updateRootState={this.props.updateRootState}
                        modalState={this._updateStates}
                        />
                    </View>
                </Modal>
            </View>
        );
    }

}