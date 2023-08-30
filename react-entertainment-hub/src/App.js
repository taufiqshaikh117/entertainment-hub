import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";    
import { Container } from "@material-ui/core";
import Login from "./Pages/Auth/Login";
import AuthState from "./context/Auth/AuthState";
import Profile from "./Pages/Auth/Profile";
import SignUp from "./Pages/Auth/Signup";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container>
            <Switch>
              <Route path="/" component={Trending} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={SignUp} exact />
              <Route path="/profile" component={Profile} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
