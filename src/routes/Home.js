import { dbService } from 'fbase'
import React, { Component } from 'react'

export default class Home extends Component {
  state = {
    tweet: '',
    tweets: []
  }
  componentDidMount () {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      this.setState({
        tweets: tweetArray
      })
      console.log(tweetArray)
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    dbService.collection('tweets').add({
      text: this.state.tweet,
      createtime: Date.now(),
      writerId: this.props.userObj.uid
    })
    this.setState({
      tweet: ''
    })
  }
  onChange = (event) => {
    const { name, value } = event.target

    if (name === 'tweet') {
      this.setState({
        tweet: value
      })
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="tweet" value={this.state.tweet} placeholder="What's up !" onChange={this.onChange} />
          <button type="submit">Tweet!</button>
        </form>
        <hr />
        <ul>
          {this.state.tweets.map(tweet => (
            <li>{tweet.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}
