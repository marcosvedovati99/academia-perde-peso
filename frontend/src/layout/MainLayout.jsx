import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CalculoIMC from '../pages/CalculoIMC';
import AlunoAcompanhamento from '../pages/AlunoRelatorio';

const PrivateRoute = lazy(() => import('../components/PrivateRoute'));
const LoginPage = lazy(() => import('../pages/Login'));
const CadastroPage = lazy(() => import('../pages/CadastroPage'));
const AlunoListPage = lazy(() => import('../pages/AlunoList'));
const AlunoCreatePage = lazy(() => import('../pages/AlunoCreatePage'));
const AppLayout = lazy(() => import('./AppLayout'));

function MainLayout() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/imc" />} />
        <Route path="/imc" element={(
            <PrivateRoute>
              <AppLayout>
                <CalculoIMC />
              </AppLayout>
            </PrivateRoute>
          )} />
        <Route
          path="/alunos"
          element={(
            <PrivateRoute>
              <AppLayout>
                <AlunoListPage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route
          path="/alunos/new"
          element={(
            <PrivateRoute>
              <AppLayout>
                <AlunoCreatePage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route
          path="/aluno/:alunoId"
          element={(
            <PrivateRoute>
              <AppLayout>
                <AlunoCreatePage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
         <Route
          path="/acompanhamento/aluno/:alunoId"
          element={(
            <PrivateRoute>
              <AppLayout>
                <AlunoAcompanhamento />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainLayout;
