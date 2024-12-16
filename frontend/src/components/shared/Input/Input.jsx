import React from 'react';
import styles from './Input.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { combineClasses } from '../../../utility';

const Input = ({ name, placeholder, type = "text", register, errors, icon, validation,
    label, onboard

}) => {
    return (
        <div className={type == "checkbox" ? combineClasses(styles?.input_relative, styles?.input_1) : styles.input_relative} >
            {
                label && <label className={styles?.label}>{label}
                    {
                        validation?.required && <span className='text-danger'>*</span>
                    }</label>
            }
            <input
                style={{
                    padding: !icon ? "10px" : ""
                }}
                className={onboard ? combineClasses(styles?.input, styles?.onboard) : styles.input}
                placeholder={placeholder}
                type={type}
                {...register(name, validation)}
            />
            {errors[name] && <ErrorMessage message={errors[name].message} onboard={onboard} />}
            <span className={onboard ? combineClasses(styles.input_absolute, styles.input_absolute2) : styles.input_absolute}>{icon}</span>
        </div>
    );
};

export default Input;
