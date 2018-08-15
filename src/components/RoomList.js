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

    deleteRoom(key, index) {
        this.roomsRef.child(key).remove();
        let newRooms = this.state.rooms;
        newRooms.splice(index, 1);
        this.setState({rooms: newRooms});
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
            <section id="room-list" className='text-left'>
                <form onSubmit={ (e) => this.createRoom(e)}>
                    <input type="text" name="roomname" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)}/>
                    <input type="submit" value="Create Room"/>
                </form>
                <div>
                    {this.state.rooms.map( (room, index) =>
                        <section key={index}>
                            <span id='delete-room' onClick={() => this.deleteRoom(room.key, index)}>x </span>
                            <span className={room.key === this.props.activeRoom.key ? 'font-weight-bold' : null} key={room.key} onClick={()=>this.props.handleRoomClick(room)}>{room.name}</span>
                        </section>
                    )}
                </div>
            </section>
        );
    }
}

export default RoomList;