import { BrowserRouter, Routes as Routed, Route } from "react-router-dom";
import { LoginPage } from "../pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routed>
        <Route element={<LoginPage />} path="/" />
      </Routed>
    </BrowserRouter>
  );
};

export default Routes;
