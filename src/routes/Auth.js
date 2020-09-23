import React, { Component } from 'react'

export default class Auth extends Component {
  state = {
    email: '',
    password: ''
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
          email: value
        })
        break
      default:
        break
    }
  }
  onSubmit = (event) => {
    console.log(event.target.value)
  }
  render() {
    return (
      <div>
        <form>
          <input type="text" name="email" placeholder="E-mail" value={this.state.email} required onChange={this.onChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} required />
        </form>
        <div>
          <button type="submit">GOOGLE</button>
        </div>
      </div>
    )
  }
}
