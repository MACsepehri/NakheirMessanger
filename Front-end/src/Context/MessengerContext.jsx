import { createContext, useContext, useState } from "react";


export let MessengerContext = createContext();



export let FuncContextProviderManager = ({children}) => {
    let [isLogedIn,ChnageActiveForm] = useState(false);
    let ChangeFormActiveStatus = (value) => {
        ChnageActiveForm(value)
    }

    return(
        <MessengerContext.Provider value={{isLogedIn,ChnageActiveForm}}>
            {children}
        </MessengerContext.Provider>
    )
}