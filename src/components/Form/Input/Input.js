import React from 'react';
import css from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [];
    const inputBoxClasses = [css.InputBox];

    if(props.invalid && props.shouldValidate && props.activated) {
        inputClasses.push(css.error);
    }

    switch (props.elementType) {
        case ('input'):
            inputClasses.push(css.Input);
            inputElement = <input 
                className={inputClasses.join(' ')} 
                type={props.inputType}
                name={props.inputName} 
                id={props.inputId}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('checkbox'):
            inputBoxClasses.push(css.Checkbox);
            inputElement = <input 
                className={inputClasses.join(' ')} 
                type={props.inputType} 
                name={props.inputName} 
                id={props.inputId}
                value={props.value}
                onChange={props.changed}/>
            break;
        //Possible space for textarea etc.
        default: {
            inputClasses.push(css.Input);
            inputElement = <input 
                className={inputClasses.join(' ')} 
                type={props.inputType} 
                name={props.inputName} 
                id={props.inputId}
                value={props.value}
                onChange={props.changed}/>
        }
    }

    return (
        <div className={inputBoxClasses.join(' ')}>
            <label className={css.Label} htmlFor={props.inputName}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;