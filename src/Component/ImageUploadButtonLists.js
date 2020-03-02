import React,{Component} from 'react';
import {View,Text,Image,Button,TouchableOpacity,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImageUploadButtonLists extends Component{
    constructor(){
        super();
        this.state={
            avatarSource:{uri:'https://www.sovereignsolutionscorp.com/wp-content/uploads/2018/12/img-avatar-blank-300x300.jpg'}
        }
    }
    _onOpenCamera=(e)=>{
        e.preventDefault();
        // Launch Camera:
        const options = {};
        ImagePicker.launchCamera(options,(response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source,
                // });
                this.props.updateUpload(response);
            }
        });

    };
    _handleOnOpenFolder=(e)=>{
      e.preventDefault();
        const options = {};
        ImagePicker.launchImageLibrary(options,(response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.props.updateUpload(response);
            }
        });
    };
    render() {
        return (
            <View style={{marginTop:10}}>
                <TouchableOpacity style={styles.listStyle} onPress={this._onOpenCamera}>
                    <Image
                        style={{ width: 40, height: 40,marginEnd:10 }} source= {{uri:'https://cdn.instructables.com/ORIG/FDI/SYTL/HLJV1S6M/FDISYTLHLJV1S6M.png'}}
                    />
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize:18}}>Camera</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listStyle} onPress={this._handleOnOpenFolder}>
                    <Image
                        style={{ width: 35, height: 35,marginEnd:10 }} source= {{uri:'https://library.kissclipart.com/20180926/yow/kissclipart-folder-icon-clipart-computer-icons-clip-art-061ae63ae703d6b4.png'}}
                    />
                    <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:18}}>Upload from Folder</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles=StyleSheet.create({
   listStyle:{
       padding:10,
       borderBottomWidth:1,
       borderBottomColor:'#ddd',
       flexDirection:'row'
   }
});