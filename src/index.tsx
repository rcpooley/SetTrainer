import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { PageExplorer } from './pages/explorer';
import { PageTest } from './pages/test';
import { GlobalSVGDefs } from './res/globalSVGDefs';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageExplorer />,
    },
    {
        path: '/test',
        element: <PageTest />,
    },
]);

root.render(
    <React.StrictMode>
        <GlobalSVGDefs />
        <RouterProvider router={router} />
    </React.StrictMode>
);
