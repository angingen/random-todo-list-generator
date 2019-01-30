import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
