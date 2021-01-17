import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Router from './scenes/routes.js';
import { createStore, Provider } from './stores/createStore.js';

const store = createStore();

function App() {
  store.bootstrap();
  
  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

Modal.setAppElement('#modalRoot')

export default App;
