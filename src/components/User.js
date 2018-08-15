import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        })
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return(
            <section>
                <span>{this.props.user === null ? 'Guest' : this.props.user.displayName}</span>
                <button type="button" className='btn btn-primary' onClick={() => this.signIn()}>Sign In</button>
                <button type="button" className='btn btn-secondary' onClick={() => this.signOut()}>Sign Out</button>
            </section>
        )
    }
}

export default User;