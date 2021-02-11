/**
 * Table of contents:
 * 
 * 1. JavaScript
 *  1.1. Global state (list of users)
 *  1.2. Get data from jsonplaceholder.com
 *  1.3. Toggle expanded view for individual users (passed as prop to ClientInfo.js)
 *  1.4. Toggle expanded view for all users
 * 
 * 2. JSX
 *  2.1. Button: Fetch data
 *  2.2. Checkbox: Toggle all users' expanded view
 *  2.3. Display all users
 */

import './App.css'
import { useState } from "react"
import ClientInfo from "./components/ClientInfo"

// 1. JavaScript
export default function App() {
  // 1.1. Global state (list of users)
  const [users, setUsers] = useState([{}])

  // 1.2. Get data from jsonplaceholder.com
  async function getData() {
    const req = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await req.json()
    const userInfo = data.map(user => ({ ...user, expanded: true }))
    setUsers(userInfo)
  }

  // 1.3. Toggle expanded view for individual users (passed as prop to ClientInfo.js)
  function toggleUser(name) {
    const updatedUsers = users.map(user => {
      if (user.name === name) {
        return { ...user, expanded: !user.expanded }
      }
      return user
    })
    setUsers(updatedUsers)
  }

  // 1.4. Show or hide expanded view for all users
  function showAllUserInfo(newState) {
    setUsers(users => {
      const updatedUsers = users.map(user => {
        return { ...user, expanded: newState }
      })
      return updatedUsers
    })
  }

  // 2. JSX
  return (
    <div className="App">
      {/* 2.1. Button: Fetch data */}
      <button disabled={users.length > 1} onClick={async () => await getData()}>
        Last inn data
      </button>

      {users.length > 1 &&
        <>
          {/* 2.2. Toggle all users */}
          <button onClick={() => showAllUserInfo(true)}>Vis all info</button>
          <button onClick={() => showAllUserInfo(false)}>Skjul all info</button>

          {/* 2.3. Display all users */}
          <div className="user-info">
            {users.map(function displayUser(user, index) {
              return <ClientInfo key={index} user={user} toggleUser={toggleUser} />
            })}
          </div>
        </>
      }
    </div>
  )
}