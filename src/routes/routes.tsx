import { BrowserRouter, Routes as Routed, Route } from "react-router-dom";
import { LoginPage } from "../pages";
import PostsPage from "../pages/PostsPage/posts";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routed>
        <Route element={<LoginPage />} path="/" />
        <Route element={<PostsPage />} path="/posts" />
      </Routed>
    </BrowserRouter>
  );
};

export default Routes;
