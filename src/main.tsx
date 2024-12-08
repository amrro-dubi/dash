

import * as ReactDOM from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";
import "./assets/css/bootstrap-icons.css";
import "./assets/css/boxicons.min.css";
import "./assets/css/fontawesome.min.css";
import "./assets/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/swiper-bundle.min.css";
import "./assets/css/nice-select.css";
import "./assets/css/style.css";
import './i18n';
// import './assets/css/style.css'
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./routes/route";
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")!).render(<Provider store={store}>  <ToastContainer position='bottom-right' /> <RouterProvider router={router} /></Provider>);

