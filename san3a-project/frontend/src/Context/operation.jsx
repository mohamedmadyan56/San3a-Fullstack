import { createContext, useState } from "react";

export let CounterContext = createContext();

export function ContextProvider(props) {
    let [counter, setCounter] = useState(0);
    let [userName, setUserName] = useState("mai");
    let [token, setToken] = useState(localStorage.getItem("userToken") || "");

    return (
        <CounterContext.Provider value={{ counter, userName, token, setToken }}>
            {props.children}
        </CounterContext.Provider>
    );
}
