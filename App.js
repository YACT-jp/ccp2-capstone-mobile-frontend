import React from 'react';

import ProtectedApp from './ProtectedApp.js';
import {AuthProvider} from './providers/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  );
};

export default App;
