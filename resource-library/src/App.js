import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import NotFound from './pages/NotFound'; // Ensure NotFound is properly exported

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={<route.component />} // Render component with element prop in React Router v6
          />
        ))}
        <Route path="*" element={<NotFound />} /> {/* Fallback route */}
      </Routes>
    </Router>
  );
};

export default App;
