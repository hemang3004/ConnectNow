import { Route } from "react-router-dom";
import "./App.css";
import React,{Suspense} from "react";
import ResetPassword from "./Pages/ResetPassword";
// import ChatPages from "./Pages/ChatPages";
const ChatPages=React.lazy(()=>import("./Pages/ChatPages"))
const HomePage=React.lazy(()=>import("./Pages/HomePage"))
const ResetPage=React.lazy(()=>import("./Pages/ResetPage"))
const VideoRoom=React.lazy(()=>import("./Components/videoRoom"))
const MainPage=React.lazy(()=>import("./Pages/MainPage"))
const Verify=React.lazy(()=>import("./Components/Authentication/Verify"))

function App() {
  return (
    <div className="App">
      <Suspense fallback={
      
      <div>  
        Loading....</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;

// without writing await while fetching data it will return promise not actual data
// without writing async and use await will give error
