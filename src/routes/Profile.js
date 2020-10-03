import { authService, dbService } from 'fbase'
import React, { Component } from 'react'
export default class Profile extends Component {
  onLogOutClick = () => {
    authService.signOut()
  }

  getMyTweets = async () => {
    let tweets =
      await dbService.collection('tweets')
     .where('writerId', '==', this.props.userObj.uid)
     .orderBy('createtime', 'desc')
     .get()
  }

  componentDidMount() {
    this.getMyTweets()
  }

  render() {
    return (
      <>
        <button onClick={this.onLogOutClick}>Log Out</button>
      </>
    )
  }
}
