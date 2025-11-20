import "./App.css";
import { BrowserRouter } from "react-router";
import RoutesSetup from "./routes/RoutesSetup";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signMode, setSignMode] = useState<"in" | "up">("in");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <div>로1딩</div>;
  }
  return (
    <div className="App">
      {!user ? (
        signMode === "in" ? (
          <div>
            <a>넌 로1그인이나 해라</a>
            <Signin />
            <button onClick={() => setSignMode("up")}>
              회원가입 하러 가기
            </button>
          </div>
        ) : (
          <div>
            <a>넌 회1원가1입이나 해라</a>
            <Signup />
            <button onClick={() => setSignMode("in")}>로그인 하러 가기</button>
          </div>
        )
      ) : (
        <>
          <BrowserRouter>
            <RoutesSetup />
          </BrowserRouter>
          <button onClick={() => auth.signOut()}>넌 나가라</button>
        </>
      )}
    </div>
  );
}

export default App;
