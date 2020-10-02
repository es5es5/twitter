import Tweet from 'components/Tweet'
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
    const { name, value, files } = event.target

    switch (name) {
      case 'tweet':
        this.setState({
          tweet: value
        })
        break
      case 'file':
        console.log(files)
        this.getFilePreview(files)
        break
      default:
        break
    }
  }

  getFilePreview = (files) => {
    const fileReader = new FileReader()
    fileReader.onloadend = finish => {
      console.log(finish.target.result)
    }

    fileReader.readAsDataURL(files[0])
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="tweet" value={this.state.tweet} placeholder="What's up !" onChange={this.onChange} />
          <input type="file" name="file" accept="image/*" onChange={this.onChange} />
          <button type="submit">Tweet!</button>
        </form>
        <hr />
        <div>
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.writerId === this.props.userObj.uid} />
          ))}
        </div>
      </div>
    )
  }
}
