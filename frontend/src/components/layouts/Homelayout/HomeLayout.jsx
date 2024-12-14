import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from "./HomeLayout.module.scss"
import SideBar from '../../shared/Sidebar/Sidebar'
import TopBar from '../../shared/TopBar/TopBar'
const HomeLayout = () => {
    return (
        <div>
            <div className={styles?.main_container}>
                <SideBar />
                <div className={styles?.rightSideContainer}>
                    <TopBar />
                    <div className={styles?.outlet_content}>
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomeLayout