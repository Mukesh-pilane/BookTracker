import React from 'react'
import { NavLink } from "react-router"

import { FaBook } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookTanakh } from "react-icons/fa6";

import styles from "./Sidebar.module.scss"


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <FaBookTanakh />
          <h1>Booktracker</h1>
          <hr />
        </div>
        <ul className={styles.menu}>
          <li className={styles.listItem}>
            <FaBook />
            <NavLink to="/books">Books</NavLink>
          </li>
        </ul>
      </div>
      <ul className={styles.profile}>
        <li className={styles.listItem}>
          <FaCircleUser />
          {JSON.parse(localStorage.getItem("user"))?.email.split("@")[0]}
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar