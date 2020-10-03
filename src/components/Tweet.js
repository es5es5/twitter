import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { dbService } from 'fbase'

export default class Tweet extends Component {
  state = {
    editing: false,
    newTweet: this.props.tweetObj.text
  }

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  onDeleteClick = async () => {
    const ok = window.confirm('Delete this Tweet?')
    if (ok) {
      await dbService.doc(`tweets/${this.props.tweetObj.id}`).delete()
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    await dbService.doc(`tweets/${this.props.tweetObj.id}`).update({
      text: this.state.newTweet
    })
    this.setState({
      editing: false
    })
  }
  onChange = event => {
    const {name, value} = event.target

    switch (name) {
      case 'newTweet':
        this.setState({
          newTweet: value
        })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div>
        {
          this.state.editing
          ?
          <>
          <form onSubmit={this.onSubmit}>
            <input type="text" name="newTweet" value={this.state.newTweet} required onChange={this.onChange} />
            <button type="submit">EDIT</button>
          </form>
          <button type="button" onClick={this.toggleEditing}>CANCEL</button>
          </>
          :
          <>
          <h4>{this.props.tweetObj.text}</h4>
          {this.props.tweetObj.attachmentUrl &&
          <img src={this.props.tweetObj.attachmentUrl} alt="tweet"  width="100px" height="100px" />
          }
          </>
        }
        {this.props.isOwner &&
        <>
          <button type="button" onClick={this.onDeleteClick}>DELETE</button>
          <button type="button" onClick={this.toggleEditing}>EDIT</button>
        </>
        }
      </div>
    )
  }
}
