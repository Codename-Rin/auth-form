import React from 'react';
import css from './Header.css';

const header = (props) => {
    return (
        <header className={css.Header}>
            <h1 className="Header__title">Best Form EU</h1>
        </header>
    );
}

export default header;