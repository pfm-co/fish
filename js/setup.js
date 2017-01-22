
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store/configureStore';

function setup(): React.Component {
  let isMounted = false;
      
  class Root extends Component {
    constructor() {
      super();
      this.state = {
          isLoading: true,
          store: configureStore(() => {
              if (isMounted)
                  this.setState({isLoading: false})
          }),
      };
    }

    componentDidMount() {
        isMounted = true;
    }

    componentWillUnmount() {
        isMounted = false;
    }

    render() {
      if (this.state.isLoading) {
          return null;
      }
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
