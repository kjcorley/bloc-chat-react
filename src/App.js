import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import { runInThisContext } from 'vm';

var config = {
  apiKey: "AIzaSyB63u-QCRwjFlWO7zrLcZP3a_ktDLr5B4s",
  authDomain: "bloc-chat-react-fef4a.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-fef4a.firebaseio.com",
  projectId: "bloc-chat-react-fef4a",
  storageBucket: "bloc-chat-react-fef4a.appspot.com",
  messagingSenderId: "1061363746401"
};
firebase.initializeApp(config);;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
