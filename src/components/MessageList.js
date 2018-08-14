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

    convertTime(epochTime) {
        let newDate = new Date(epochTime);
        return newDate.toLocaleTimeString();
    }

    render() {
        return(
            <section className="mx-auto" id="message-list">
                    {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) => 
                        <div key={index} className="message">
                            <div>
                                <span className="username">{message.username}</span>
                                <span> - </span>
                                <span className="timestamp">{this.convertTime(message.sentAt)}</span>
                            </div>
                            <div className="message-content">{message.content}</div>
                        </div>
                    )}
            </section>
        )
    }
}

export default MessageList;