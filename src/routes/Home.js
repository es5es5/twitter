import Tweet from 'components/Tweet'
import { v4 as uuid } from 'uuid'
import { dbService, storageService } from 'fbase'
import React, { Component } from 'react'

export default class Home extends Component {
  state = {
    tweet: '',
    tweets: [],
    attachment: null
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

  onSubmit = async (event) => {
    event.preventDefault()
    let attachmentUrl = null

    if (this.state.attachment) {
      const attachmentRef = storageService.ref().child(`${this.props.userObj.uid}/${uuid()}`)
      const response = await attachmentRef.putString(this.state.attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }

    const tweet = {
      text: this.state.tweet,
      createtime: Date.now(),
      writerId: this.props.userObj.uid,
      attachmentUrl
    }

    await dbService.collection('tweets').add(tweet)

    this.setState({
      tweet: '',
      attachment: null,
      attachmentUrl: null
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
        if (files) {
          console.log(files)
          this.getFilePreview(files)
        }
        break
      default:
        break
    }
  }

  getFilePreview = (files) => {
    const fileReader = new FileReader()
    fileReader.onloadend = finish => {
      this.setState({ attachment: finish.target.result })
    }

    fileReader.readAsDataURL(files[0])
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="tweet" value={this.state.tweet} placeholder="What's up !" onChange={this.onChange} />
          <input type="file" name="file" accept="image/*" onChange={this.onChange} />
          {this.state.attachment &&
          <img src={this.state.attachment} alt="tweet"  width="100px" height="100px" />
          }
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
