import React, { Component } from 'react'

export default class Auth extends Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="E-mail" required />
          <input type="password" placeholder="Password" required />
        </form>
        <div>
          <button type="submit">GOOGLE</button>
        </div>
      </div>
    )
  }
}
