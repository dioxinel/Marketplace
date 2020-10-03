import React, { useEffect } from 'react';
import Router from './scenes/routes.js';
import { createStore, Provider } from './stores/createStore.js';

const store = createStore();

function App() {
  useEffect(() => {
    store.bootstrap();
  }, []);
  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

export default App;
