import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './MyApp/Redux/store';
import AuthNavigation from './AppModules/AuthModule/Utils/AuthNavigation';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
