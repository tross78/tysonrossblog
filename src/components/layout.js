import * as React from 'react'
import { Link } from 'gatsby'

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <nav class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <a class="btn btn-ghost normal-case text-xl">Tyson Ross</a>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <main class="p-3">
        {children}
      </main>
    </div>
  )
}

export default Layout