import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message )});
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeRoom !== prevProps.activeRoom) {

        }
    }

    roomChange() {
        if (!this.props.activeRoom.key) {
            this.setState({ messages: [] });
        }
        this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).once('value', snapshot => {
            let newMessages = [];
            snapshot.forEach((childSnapshot) => {
                let message = childSnapshot.val();
                message.key = childSnapshot.key
                newMessages.push(message);
            });
            newMessages.sort((a, b) => {
                return a.sentAt - b.sentAt;
            });
            this.setState({ messages: newMessages});
        })
    }

    render() {
        return(
            <section id="message-list">
                    {this.state.messages.map( (message) => 
                        <div className="message">
                            <div className="username">{message.username}</div>
                            <div className="timestamp">{message.sentAt}</div>
                            <div className="message-content">{message.content}</div>
                        </div>
                    )}
            </section>
        )
    }
}

export default MessageList;