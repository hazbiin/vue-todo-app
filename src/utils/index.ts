
// local storage setting utility function.
export function setLocalStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
}

// fetching from api utility function.
export async function fetchDataFromApi(url: string, options?: object){
    try{
      const response = await fetch(url, options);

      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    }catch(error) {
      console.error(`Error fetching data: ${error}`);
    }
}