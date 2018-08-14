import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: []
    }
  }

  handleRoomClick(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <main>
          <div className='container-fluid'>
            <div className='row'>
              <RoomList className='col-4'
                firebase={firebase}
                handleRoomClick={(room) => this.handleRoomClick(room)}
              />
              <MessageList className='col-8'
                firebase={firebase}
                activeRoom={this.state.activeRoom}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
