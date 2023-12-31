import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import DashLayout from "../components/layout/DashLayout";

//Public Routes
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";

//Protected Routes
import PersistLogin from "../app/PersistSession/PersistLogin";
import Prefetch from "../app/Prefetch";
import WelcomePage from "../pages/welcome/WelcomePage";
import UsersListPage from "../pages/users/UsersListPage";
import UserCreationPage from "../pages/users/UserCreationPage";
import UserEditPage from "../pages/users/UserEditPage";
import NoteListPage from "../pages/notes/NoteListPage";
import NoteCreationPage from "../pages/notes/NoteCreationPage";
import NoteEditPage from "../pages/notes/NoteEditPage";

import { USERS_ROLES } from "../constants/userConstants";
import RequireAuth from "../app/RequiredAuth";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(USERS_ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<WelcomePage />} />
                <Route element={<RequireAuth allowedRoles={[USERS_ROLES.Admin, USERS_ROLES.Manager]} />}>
                  <Route path="users">
                    <Route index element={<UsersListPage />} />
                    <Route path="new" element={<UserCreationPage />} />
                    <Route path=":id" element={<UserEditPage />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NoteListPage />} />
                  <Route path="new" element={<NoteCreationPage />} />
                  <Route path=":id" element={<NoteEditPage />} />
                </Route>
              </Route>
              {/*End Dash*/}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
