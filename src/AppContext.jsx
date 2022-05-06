import React, {
  useContext,
  useState,
} from "react";

export const authContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
})




// const UserContext = createContext(null);
// const [user, setUser] = React.useState('abc');