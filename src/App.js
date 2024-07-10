import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MarketPage from "./pages/Market/MarketPage";
import AddFriends from "./pages/AddFriends/AddFriends";
import ProfilePage from "./pages/Profile/ProfilePage";
import Authentication from "./pages/Authentication/Authentication";
import Comments from "./pages/Comments/CommentsList";
import PostDetails from "./pages/Profile/PostDetails/PostDetails";
import Chat from "./pages/Chat/Chat";
import ProductDetails from "./pages/Market/productDetails/ProductDetails";
import ProtectRoute from "./components/protectRoute/protectRoute";
import { PostListContextProvider } from "./pages/Home/PostList/usePostList";

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
                <PostListContextProvider>
                  <Home />
                </PostListContextProvider>
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
                <PostListContextProvider>
                  <ProfilePage />
                </PostListContextProvider>
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
            path="/comments/:id"
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
