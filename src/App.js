import Layout from "./components/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Showcase from "./pages/Showcase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Admin from "./pages/admin/Admin";

import CreateNews from "./pages/admin/CreateNews";
import EmployeesList from "./pages/admin/EmployeesList";
import ProfileUser from "./pages/user/ProfileUser";
import { NewsProvider } from "./context/NewsContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#115293",
      light: "#4791db",
      dark: "#115293",
    },
    secondary: {
      light: "#dc004e",
      main: "#9a0036",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <NewsProvider>
            <Switch>
              <Layout>
                <PrivateRoute exact path="/admin" type={"admin"}>
                  <Admin />
                </PrivateRoute>
                <PrivateRoute exact path="/employees" type={"admin"}>
                  <EmployeesList />
                </PrivateRoute>
                <PrivateRoute exact path="/news" type={"admin"}>
                  <CreateNews />
                </PrivateRoute>

                <PrivateRoute exact path="/profileuser" type={"user"}>
                  <ProfileUser />
                </PrivateRoute>
                <PrivateRoute exact path="/profileuser/edituser" type={"user"}>
                  <ProfileUser />
                </PrivateRoute>
                <Route exact path="/">
                  <Showcase />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
              </Layout>
            </Switch>
          </NewsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (currentUser?.isAdmin && rest?.type === "admin") ||
          (!currentUser?.isAdmin && rest?.type === "user") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default App;
