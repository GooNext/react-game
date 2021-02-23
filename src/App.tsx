import { BrowserRouter, Route, Switch } from "react-router-dom";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import GamePage from "./pages/GamePage";
import bg from "./assets/img/bg.jpg";
import Statistic from "./components/Statistic/Statistic";

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: window.innerWidth > 500 ? "100vh" : "auto",
          background: `url(${bg})`,
          overflowX: "hidden",
        }}
      >
        <SettingsPanel />
        <Switch>
          <Route path="/" exact component={GamePage} />
          <Route path="/statistic" exact component={Statistic} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
