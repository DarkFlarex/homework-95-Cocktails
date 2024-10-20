import { createRoot } from 'react-dom/client'
import App from './App'
import {addInterceptors} from "./axiosApi";
import {persistor, store} from "./app/store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>,
)
