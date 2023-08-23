import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import DashLayout from "../components/layout/DashLayout";

//Public Routes
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";

//Protected Routes
import WelcomePage from "../pages/welcome/WelcomePage";
import NoteListPage from "../pages/notes/NoteListPage";
import UsersListPage from "../pages/users/UsersListPage";
import UserCreationPage from "../pages/users/UserCreationPage";
import UserEditPage from "../pages/users/UserEditPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="users">
            <Route index element={<UsersListPage />} />
            <Route path="new" element={<UserCreationPage/>} />
            <Route path=":id" element={<UserEditPage/>} />
          </Route>
          <Route path="notes">
            <Route index element={<NoteListPage />} /> 
          </Route>
        </Route>{/*End Dash*/}
      </Route>
    </Routes>
  );
};

export default Router;
