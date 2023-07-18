import { Navigate, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Login from './pages/Login';
import { MyQuests } from './pages/MyQuests/MyQuests';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        Component: MyQuests,
        index: true,
      },
      {
        path: 'quest_book',
        Component: MyQuests,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/quest_book" replace />,
  },
  {
    path: '',
    element: <Navigate to="/quest_book" replace />,
  },
]);

export const publicRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '',
    element: <Navigate to="/login" replace />,
  },
]);
