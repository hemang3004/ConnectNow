import { Route } from "react-router-dom";
import "./App.css";
import ResetPassword from "./Pages/ResetPassword";
import ChatPages from "./Pages/ChatPages";
import HomePage from "./Pages/HomePage";
import ResetPage from "./Pages/ResetPage";
import VideoRoom from "./Components/videoRoom";
import MainPage from "./Pages/MainPage";
import Verify from "./Components/Authentication/Verify";
function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/chats" component={ChatPages} exact></Route>
      <Route path="/reset" component={ResetPage} exact></Route>
      <Route path="/main" component={MainPage} exact></Route>

      <Route
        path="/reset-password/:id/:token"
        component={ResetPassword}
        exact
      ></Route>
      <Route path="/verify" component={Verify}></Route>
      <Route path="/video-call" component={VideoRoom}></Route>
    </div>
  );
}

export default App;

// without writing await while fetching data it will return promise not actual data
// without writing async and use await will give error
