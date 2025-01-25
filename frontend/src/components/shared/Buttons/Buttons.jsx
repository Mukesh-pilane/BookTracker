import React from 'react';
import styles from './Buttons.module.scss';
import { combineClasses } from '../../../utility';

const Buttons = ({
    onClick,
    width = '100%',
    height = 'auto',
    borderRadius = '6px',
    padding = '10px 90px',
    style,
    theme = "primary",
    children,
}) => {
    return (
        <button
            onClick={onClick}
            className={combineClasses(theme == "primary" ? styles.button : styles.button2)}
            type='submit'
            style={{ width, height, borderRadius, padding, ...style }}
        >
            {children}
        </button>
    );
};

export default Buttons;
