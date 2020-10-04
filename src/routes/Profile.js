import { authService, dbService } from 'fbase'
import React, { Component } from 'react'
export default class Profile extends Component {
  state = {
    myTweets: []
  }

  onLogOutClick = () => {
    authService.signOut()
  }

  getMyTweets = async () => {
    let tweets =
      await dbService.collection('tweets')
     .where('writerId', '==', this.props.userObj.uid)
     .orderBy('createtime', 'desc')
     .get()

     this.setState({
       myTweets: tweets.docs.map(doc => doc.data())
      })
     console.log(this.state.myTweets)
  }

  componentDidMount() {
    this.getMyTweets()
  }

  render() {
    return (
      <>
        <hr />
        <h3>My Tweets</h3>
        <ul>
          {
            this.state.myTweets.map(tweet => {
            return <li>{tweet.text} {Date(tweet.createtime)}</li>
            })
          }
        </ul>
        <button onClick={this.onLogOutClick}>Log Out</button>
      </>
    )
  }
}
