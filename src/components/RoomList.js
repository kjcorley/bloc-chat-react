import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )});
        });
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value})
    }

    createRoom(e) {
        e.preventDefault();
        if(!this.state.newRoomName) { return }
        this.roomsRef.push({
            name: this.state.newRoomName
        });
        this.setState({ newRoomName: ''});
    }

    render () {
        return(
            <section id="room-list">
                <form onSubmit={ (e) => this.createRoom(e)}>
                    <input type="text" name="roomname" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)}/>
                    <input type="submit" value="Create Room"/>
                </form>
                <div>
                    {this.state.rooms.map( (room) => 
                        <section className="room-name" key={room.key} onClick={()=>this.props.handleRoomClick(room)}>{room.name}</section>
                    )}
                </div>
            </section>
        );
    }
}

export default RoomList;