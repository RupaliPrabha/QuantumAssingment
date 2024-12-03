import React from 'react'
import LoginForm from '../Atoms/LoginForm/LoginForm'
import styles from './Dashboard.module.css'

function Dashboard() {
  return (
    <div className={styles["dashboard"]}  >
      <LoginForm/>
    </div>
  )
}

export default Dashboard
