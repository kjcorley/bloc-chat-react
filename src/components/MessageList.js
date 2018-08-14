import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageContent: ''
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

    createMessage(e) {
        e.preventDefault();
        if(!this.state.messageContent) { return }
        this.messagesRef.push({
            username: this.props.user == null ? 'Guest' : this.props.user.displayName,
            content: this.state.messageContent,
            sentAt: new Date().getTime(),
            roomId: this.props.activeRoom.key
        });
        this.setState({messageContent: ''});
    }

    handleChange(e) {
        this.setState({messageContent: e.target.value})
    }

    render() {
        return(
            <section className="mx-auto" id="message-list">
                <h2>{this.props.activeRoom.name}</h2>
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
                {
                <form onSubmit={(e) => this.createMessage(e)}>
                  <input type="text" value={this.state.messageContent} onChange={(e) => this.handleChange(e)} disabled={!this.props.activeRoom ? 'disabled' : null}></input>
                  <input type="submit" value="send" disabled={!this.props.activeRoom ? 'disabled' : null}></input>
                </form>}
            </section>
        )
    }
}

export default MessageList;