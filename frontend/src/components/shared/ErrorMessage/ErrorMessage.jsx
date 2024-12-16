import React from 'react'
import styles from "./ErrorMessage.module.scss"
import { combineClasses } from '../../../utility'
const ErrorMessage = ({
    message,
    absolute = true,
    onboard
}) => {
    return (
        <div className={absolute ? onboard ? combineClasses(styles?.error, styles?.onboard) : styles?.error : styles?.error2}>{message}</div>
    )
}

export default ErrorMessage