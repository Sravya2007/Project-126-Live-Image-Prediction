import React from 'react';
import { Button, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PickImage extends React.Component{
    state = {
        imageURL: null,
        letter: ''
    }

    getUserPermission = async () => {
        if (Platform.OS !== "web") {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)

            if (status !== "granted") {
                alert("This app needs gallery permissions to make predictions.")
            }
        }
    }

    componentDidMount() {
        this.getUserPermission()
    }

    uploadImage = async (uri) => {
        const data = new FormData()

        let filename = uri.split("/")[uri.split("/").length - 1]

        let type = `image/${uri.split('.')[uri.split('.').length - 1]}`

        const file = {
            uri: uri,
            name: filename,
            type: type
        }

        data.append("alphabet", file)

        fetch("http://d693704e28c5.ngrok.io/predict-alphabet",
        {
            method: "POST",
            body: data,
            headers: { "content-type": "multipart/form-data"
        }})

        .then((response) => response.json())

        .then((output) => {
            console.log("The predicted alphabet is:\n", output)
            this.setState({
                letter: output.prediction
            })
        })

        .catch((error) => {
            console.error("An error occured:\n", error)
        })
    }

    pickImage = async () =>{
        try {
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })

            if (!image.cancelled) {
                this.setState({
                    imageURL: image.data
                })
                this.uploadImage(image.uri)
            }
        }

        catch(error) {
            console.log("An error occured:\n", error)
        }
    }

    render() {
        let { Image } = this.state
        return(
            <View style = {{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000000"
                }}>
                <Button title = "Pick an image from the gallery" onPress = {this.pickImage} color="#841584"/>
                <Text style = {{
                    marginTop: 50,
                    fontSize: 20,
                    color: "#9C1156"
                }}>The predicted alphabet is: {this.state.letter}</Text>
            </View>
        )
    }
}