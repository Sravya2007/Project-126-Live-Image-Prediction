import React from 'react';
import { Button, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PickImage extends React.Component{
    state = {
        imageURL: null
    }

    getUserPermission = async () => {
        if (Platform.OS !== "web") {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    }

    componentDidMount() {
        this.getUserPermission()
    }

    pickImage = async () =>{
        try{
            let image = ImagePicker.launch
        }
    }

    render() {
        let { Image } = this.state
        return(
            <View style = {{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
                }}>
                <Button title="Pick an image from the gallery" onPress = {this.pickImage()} />
            </View>
        )
    }
}