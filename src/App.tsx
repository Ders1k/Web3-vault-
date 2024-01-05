import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Deposits from './pages/Deposits';
import Vault from './pages/Vault';

function App() {
  const routes = [
    { path: '/', element: <Vault /> },
    { path: 'deposits', element: <Deposits /> }
  ];

  return (
    <MainLayout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
