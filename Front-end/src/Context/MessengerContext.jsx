import { createContext, useContext, useState } from "react";


export let MessengerContext = createContext();



export let FuncContextProviderManager = ({children}) => {
    let [ActiveForm,ChnageActiveForm] = useState(true);
    let ChangeFormActiveStatus = (value) => {
        ChnageActiveForm(value)
    }

    return(
        <MessengerContext.Provider value={{ActiveForm,ChangeFormActiveStatus}}>
            {children}
        </MessengerContext.Provider>
    )
}