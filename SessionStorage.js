export function getItem(key) {
    const value = sessionStorage.getItem(key);

    if(value){
        return JSON.parse(value)
    }
    return;
}

export function setItem(key, value) {
    const toJson = JSON.stringify(value);

    sessionStorage.setItem(key, toJson);
}