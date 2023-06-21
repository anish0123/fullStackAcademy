import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={( event ) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={( event ) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button id="login-button" type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
