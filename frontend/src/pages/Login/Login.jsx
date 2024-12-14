import React from 'react'
import styles from "./Login.module.scss"

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // login logic
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.right}>
        <form submit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Pasword</label>
          <input type="password" name="password" />
          <button>login</button>
        </form>
      </div>
      <div className={styles.left}>
      </div>
    </div>
  )
}

export default Login