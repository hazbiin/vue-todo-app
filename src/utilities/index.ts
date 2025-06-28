
// local storage setting utility function.
export default function setLocalStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
}