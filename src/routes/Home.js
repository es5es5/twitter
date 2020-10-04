import Tweet from 'components/Tweet'
import { dbService } from 'fbase'
import React, { Component } from 'react'
import TweetFactory from 'components/TweetFactory'
import PropTypes from 'prop-types'

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

  render() {
    return (
      <div>
        <TweetFactory userObj={this.props.userObj} />
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

Home.propTypes = {
  userObj: PropTypes.object.isRequired
}
