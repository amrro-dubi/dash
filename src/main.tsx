import * as ReactDOM from "react-dom/client"
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import "react-toastify/dist/ReactToastify.css"

import "./globals.css"
// import "./assets/css/bootstrap-icons.css";
// import "./assets/css/boxicons.min.css";
// import "./assets/css/fontawesome.min.css";
// import "./assets/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./assets/css/swiper-bundle.min.css";
import "./assets/css/nice-select.css"
import "./tailwind.css"
import "./i18n"
// import './assets/css/style.css'
import { Provider } from "react-redux"
import store from "./store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes/route"
import { ToastContainer } from "react-toastify"
import "@mantine/core/styles.layer.css"
import "mantine-datatable/styles.layer.css"
import { MantineProvider } from "@mantine/core"
import "./assets/css/styles.css"

const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById("root")!).render(
    <MantineProvider>
        <Provider store={store}>
            {" "}
            <PhotoProvider>
          
            <ToastContainer position="bottom-right" /> <RouterProvider router={router} />

            </PhotoProvider>
        </Provider>
        
    </MantineProvider>
)
