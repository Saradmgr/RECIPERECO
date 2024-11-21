import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { AppContextProvider } from "./component/ContextApi";
import "./index.css";
import store, { persistor } from "./redux/Store";
import reportWebVitals from "./reportWebVitals";
import { MainRouter } from "./router/MainRouter";

const App = () => {
  const dispatch = useDispatch();

  return <RouterProvider router={MainRouter} />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback={"...loading"}>
      <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
