export const loadSate = () => {
    try {
        const serializedState = localStorage.getItem('vnalert-state');
        if (serializedState === null) {
            return null;
        }
        else return JSON.parse(serializedState);
    } catch (error) {
        return null
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('vnalert-state', serializedState);
    } catch (error) {
        
    }
}