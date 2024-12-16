import React from 'react';
import styles from './Buttons.module.scss';
import { combineClasses } from '../../../utility';

const Buttons = ({
    onClick,
    content,
    width = '100%',
    height = 'auto',
    borderRadius = '6px',
    padding = '10px 90px',
    style,
    theme = "primary",
}) => {
    return (
        <button
            onClick={onClick}
            className={combineClasses(theme == "primary" ? styles.button : styles.button2)}
            type='submit'
            style={{ width, height, borderRadius, padding, ...style }}
        >
            {content}
        </button>
    );
};

export default Buttons;
