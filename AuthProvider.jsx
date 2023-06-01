import React, { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      setUser(data.user);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
