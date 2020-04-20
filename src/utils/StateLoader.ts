export const loadState = () => {
    try {
        let serializedState = localStorage.getItem("forestar");

        if (serializedState === null) {
            return initializeState();
        }

        return JSON.parse(serializedState);
    }
    catch (err) {
        return initializeState();
    }
}

export const saveState = (state: any) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("forestar", serializedState);
    }
    catch (err) {
    }
}


export const deleteLocalStorage = () => {
    try {
        localStorage.removeItem("forestar")
    } catch (err) {
        console.log("faiole")
    }
}

export const initializeState = () => {
    return {
        //state object
    }
};

