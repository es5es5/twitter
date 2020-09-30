import React, { Component } from 'react'

export default class Home extends Component {
  state = {
    tweet: ''
  }
  onSubmit = (event) => {
    event.preventDefault()
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
      </div>
    )
  }
}
