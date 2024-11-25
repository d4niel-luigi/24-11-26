import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Kezdolap from './components/Kezdolap'
import TabletTorles from './components/TabletTorles';
import TabletFelvetel from './components/TabletFelvetel';
import TabletList from './components/TabletList';
import TabletKereses from './components/TabletSort';
import Tabletlapozas from './components/TabletPagination';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Kezdolap />,
  },
  {
    path: "/kezdolap",
    element: <Kezdolap />,
  },
  {
    path: "/tabletek",
    element: <TabletList />,
  },  
  {
    path: "/tabletfelvetel",
    element: <TabletFelvetel />,
  },  
  {
    path: "/tablettorles",
    element: <TabletTorles />,
  },
  {
    path:"/tabletkereses",
    element: <TabletKereses />,
  },
  {
    path:"/tabletlapozas",
    element: <Tabletlapozas />,
  }
]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)