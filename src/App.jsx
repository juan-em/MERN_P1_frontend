import Router from "./routes/Routes.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import { Provider as ReduxProvider } from "react-redux";

import TimeZoneProvider from "./contexts/TimeZoneContext/TimeZoneProvider";

function App() {
  return (
    <ReduxProvider store={store}>
      <TimeZoneProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </BrowserRouter>
      </TimeZoneProvider>
    </ReduxProvider>
  );
}

export default App;
