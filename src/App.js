import React, { Component } from 'react';
import css from './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';

class App extends Component {
  render() {
    return (
      <div className={css.App}>
        <Header />
        <div className={css.App__form}>
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
