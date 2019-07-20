import React, { Component } from 'react';
import {Provider} from 'unstated';
import Main from './containers'
import './app.less';

import CounterContainer from './store/CounterContainer'

class App extends Component {
  render() {
    const countStore = new CounterContainer(123);
    return (
      <Provider inject={[countStore]}>
        <div className="app">
          <Main/>
        </div>
      </Provider>
    );
  }
}

export default App;
