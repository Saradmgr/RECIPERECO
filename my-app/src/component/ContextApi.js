import React from "react";

const AppContext = React.createContext();

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [appState, setAppState] = React.useState({
        data: [],
        addToCart:[],
    });
    const updateState = (newState) => {
        setAppState((prevstate) => ({
            ...prevstate,
            ...newState,
        }));
    };
    return (
        <AppContext.Provider value={{appState, updateState}}>
            {children}
        </AppContext.Provider>
    );
}

// import axios from "axios";
// import React from "react";

// export const AppContext = React.createContext({});

// export const AppContextProvider = ({ children }) => {
//     const [user, setUser] = React.useState(null);

//     React.useEffect(() => {
//         if (!user) {
//             axios.get('http://localhost:5000/user/profile')
//                 .then(({ data }) => {
//                     setUser(data);
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching user profile:", error);
//                 });
//         }
//     }, [user]);

//     return (
//         <AppContext.Provider value={{ user, setUser }}>
//             {children}
//         </AppContext.Provider>
//     );
// };
