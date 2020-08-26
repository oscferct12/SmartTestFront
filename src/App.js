import React from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PersonContextProvider from './contexts/PersonContext';
import PersonList from './components/PersonList';

function App() {
  return (
    <div className="App">
      <PersonContextProvider>
        <PersonList></PersonList>
      </PersonContextProvider>
    </div>
  );
}

export default App;
