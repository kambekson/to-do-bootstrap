import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Clients from "./pages/Clients.jsx";
import Tasks from "./pages/Tasks.jsx";
import Inbox from "./pages/Inbox.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Contacts from "./pages/Contacts.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <h1>Error: Page not found</h1>,
        children:[
            {
                path: '/client',
                element: <Clients/>
            },
            {
                path: '/task',
                element: <Tasks/>
            },
            {
                path: '/inbox',
                element: <Inbox/>
            },
            {
                path: '/contacts',
                element: <Contacts/>
            }
    ]
    }
    ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
