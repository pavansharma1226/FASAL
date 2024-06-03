import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import PlaylistDetail from "./components/PlaylistDetail";
import UserProfile from "./components/UserProfile";

const Login = React.lazy(() => import("./components/Login"));

function App() {
  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/login"
          element={
            <Suspense fallback="loading .....123">
              <Login />
            </Suspense>
          }
        />
        <Route path="/" element={<Home/>}/>
        <Route path="/movieDetail/:imdbID" element={<MovieDetail/>}/>
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/playlist/:playlist_id" element={<PlaylistDetail/>}/>
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
