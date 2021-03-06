import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  AsyncStorage
} from 'react-native';
import { Input, Button, Card, CardSection } from '../components/common';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

class CameraRoute extends Component {
  constructor(props) {
    super(props);

    AsyncStorage.getItem('User').then((value) => {
      this.setState({ 'User': JSON.parse(value) })
    }).done()

    this.state = {
      path: null,
      User: null
    };
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View style={{ position: 'absolute', alignItems: 'center', flexDirection: 'column'}}>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Card style={{ position: 'absolute', alignItems: 'center', flexDirection: 'column', width: 300, height: 100, backgroundColor: 'transparent', bottom: 100 }}>
          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Input placeholder="reps" />
          </CardSection>

          <CardSection style={{ backgroundColor: 'transparent' }}>

            <Input placeholder="FRIENDS" />
          </CardSection>

          <CardSection style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
            <Button>
              Submit
            </Button>
          </CardSection>
        </Card>
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
      </View>
    );
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};

export default CameraRoute;
