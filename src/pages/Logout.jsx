import { useEffect, useState } from "react";
import "../css/style.css";
import { supabase } from "../supabase-client";
import { Home } from "./Home2";
import {  Login } from "./Login";
import ApiTester from "./ApiTester";
import MainHome from "./MainHome";

function Logout() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {session ? (
        <>
          {/* <Home session={session} /> */}
       
          <button className="absolute right-10 top-10 signin p-6" onClick={logout}>Log Out</button>
     
          <MainHome/>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Logout;
