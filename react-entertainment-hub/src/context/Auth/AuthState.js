import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";



const AuthState = (props) => {
    
    const [user, setuser] = useState();
    const [showloginbtn, setshowloginbtn] = useState(!localStorage.getItem("auth-token")?true:false);
    const host = "http://localhost:8080/api/auth";

    const login = async(credentials) => {
        const url = `${host}/login`
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const result = await response.json();
          console.log(result);
          if(result.success){
            setuser(result.user);
            setshowloginbtn(false);
            console.log(showloginbtn);
            return result;
          }else{
            alert("Invalid Credentials")
          }
    }

    const signup = async(credentials) => {
        const url = `${host}/createuser`;
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        const result = await response.json();
        console.log(result);
        setuser(result.user);
        setshowloginbtn(false);
        return result;
    }


    const getuser = async() => {
      const url = `${host}/getusers`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    }

  return (
    <AuthContext.Provider value={{user,showloginbtn,getuser,login,signup}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
