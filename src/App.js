/**
 * Table of contents:
 * 
 * 1. JavaScript
 *  1.1. Global state (list of users, toggle for all users' expanded view)
 *  1.2. Get data from jsonplaceholder.com
 *  1.3. Toggle expanded view for individual users
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

export default function App() {
  // 1. JavaScript
  // 1.1. Global state (list of users, toggle for all users' expanded view)
  const [users, setUsers] = useState([{}])
  const [showAll, setShowAll] = useState(true)

  // 1.2. Get data from jsonplaceholder.com
  async function getData() {
    const req = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await req.json()
    const userInfo = data.map(user => ({ ...user, expanded: true }))
    setUsers(userInfo)
  }

  // 1.3. Toggle expanded view for individual users
  function toggleUser(name) {
    const updated = users.map(function updateUserArray(user) {
      if (user.name === name) {
        return { ...user, expanded: !user.expanded }
      }
      return user
    })
    setUsers(updated)
  }

  // 1.4. Toggle expanded view for all users
  function expandAll(newState) {
    setShowAll(newState)
    setUsers(users => {
      const updatedUser = users.map(user => (
        { ...user, expanded: newState }
      ))
      return updatedUser
    })
  }

  // 2. JSX
  return (
    <div className="App">
      {/* 2.1. Button: Fetch data */}
      <button
        onClick={async () => await getData()}
        disabled={users.length > 1}
      >Last inn data</button>

      {users.length > 1 &&
        <>
          <button onClick={() => expandAll(true)}>Vis all info</button>
          <button onClick={() => expandAll(false)}>Skjul all info</button>
          <div className="user-info">
            {/* 2.2. Toggle all users */}

            {/* 2.3. Display all users */}
            {
              users.map((user, index) => {
                return <ClientInfo key={index} user={user} toggleUser={toggleUser} />
              })
            }
          </div>
        </>
      }
    </div>
  )
}