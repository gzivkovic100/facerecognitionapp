import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import BackParticles from './components/BackParticles/BackParticles';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';


const returnClaReqOpt = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'hier commes the PAT';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'moon1500';       
  const APP_ID = 'newFaceRec';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  return requestOptions
} 



class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      }  
    }

    loadUser = (data) => {
      this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
      }})
    }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);     
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
    }

    dislayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box});
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value})
    }

    onButtonClearInput = (event) => {
      this.setState({input: ''});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/versions/" + "6dc7e46bc9124c5c8824be4822abe105" + "/outputs", returnClaReqOpt(this.state.input))
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}))
              })
              .catch(console.log) 
          }
          this.dislayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(error => console.log('error', error));
    }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }

    render () {
      return (
        <div className="App">
          <BackParticles className='particles' />
          <Navigation  isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} className='navigation' />
          { this.state.route === 'home' 
            ? <div>
                <Logo /> 
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm  message={this.state.input}  onButtonClearInput={this.onButtonClearInput}  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
             : (
                this.state.route === 'signin'
                  ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
          }
        </div>
      );
    }
}

export default App;