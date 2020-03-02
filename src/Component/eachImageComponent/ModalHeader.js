import React,{ Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Image,TextInput,Picker} from 'react-native';

export default class ModalHeader extends Component{
    render(){
        return(
            <View style={style.container}>
                <View style={style.contRow}>
                    <View >
                        <TouchableOpacity onPress={() => this.props.updateState("modalVisible",false)} >
                            <Image
                                source={{uri:'https://www.materialui.co/materialIcons/navigation/arrow_back_white_192x192.png'}}
                                style={{width:30,height:30}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.title}>
                        <Text style={{color:'white',fontSize:20}}>{this.props.title}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const style = StyleSheet.create({
    container: {
        // paddingTop: 25,
        backgroundColor: '#212121',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,

    },
    contRow:{
        flexDirection: 'row',
        padding: 10,
        justifyContent:'center'
    },
    title: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    rightIcon: {
        flex: 1,
        // paddingTop: 10,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'

    },
    leftSearch: {
        flex: 1,
        // paddingTop: 10,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },searchIcon: {
        padding: 2
    },
    input: {
        flex: 1,
        paddingTop: 1,
        paddingRight: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        backgroundColor: '#fff',
        color: '#424242',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
    },
    sideTouchable: {
        borderLeftColor:'black',
        borderBottomRightRadius:5,
        borderTopRightRadius:5,
        backgroundColor: '#ff4444',paddingLeft: 5,paddingRight: 5
    },
    f1center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    }
});