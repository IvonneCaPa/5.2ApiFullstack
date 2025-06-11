import React, { useEffect } from 'react';
import { testConnection } from './test-api';
import './App.css';

function App() {
  useEffect(() => {
    // Probar la conexión cuando la app se carga
    testConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi App React + Laravel</h1>
        <p>Revisa la consola del navegador (F12) para ver el resultado de la conexión</p>
      </header>
    </div>
  );
}

export default App;