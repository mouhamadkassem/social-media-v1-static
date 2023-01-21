import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import MarketPage from "./components/Market/MarketPage";
import AddFriends from "./components/AddFriends/AddFriends";
import ProfilePage from "./components/Profile/ProfilePage";
import Authentication from "./components/Authentication/Authentication";
import Comments from "./components/Comments/CommentsList";
import PostDetails from "./components/Profile/PostDetails/PostDetails";
import Chat from "./components/Chat/Chat";
import ProductDetails from "./components/Market/productDetails/ProductDetails";
import ProtectRoute from "./components/protectRoute/protectRoute";

function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Authentication />} />
          <Route
            exact
            path="/home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/chat/:id"
            element={
              <ProtectRoute>
                <Chat />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/profile/:id"
            element={
              <ProtectRoute>
                <ProfilePage />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/postDetails/:id"
            element={
              <ProtectRoute>
                <PostDetails />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/auth"
            element={
              <ProtectRoute>
                <AddFriends />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/market"
            element={
              <ProtectRoute>
                <MarketPage />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/product/:id"
            element={
              <ProtectRoute>
                <ProductDetails />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/comments"
            element={
              <ProtectRoute>
                <Comments />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/*"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
