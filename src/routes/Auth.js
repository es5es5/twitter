import { authService } from 'fbase'
import React, { Component } from 'react'

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
    newAccount: true,
    error: ''
  }
  onChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'email':
        this.setState({
          email: value
        })
        break
      case 'password':
        this.setState({
          password: value
        })
        break
      default:
        break
    }
  }
  onSubmit = async (event) => {
    event.preventDefault()
    let data = null
    try {
      if (this.state.newAccount) {
        data =
        await authService.createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        )
      } else {
        data =
        await authService.signInWithEmailAndPassword(
          this.state.email,
          this.state.password
        )
      }
      console.log(data)
    } catch (error) {
      this.setState({ error: error.message  })
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={this.state.email} required onChange={this.onChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} required onChange={this.onChange} />
          <button type="submit">{ this.state.newAccount ? 'Create Account' : 'Log In' }</button>
        </form>
        <p>{ this.state.error }</p>
        <div>
          <button type="submit">GOOGLE</button>
        </div>
      </div>
    )
  }
}
