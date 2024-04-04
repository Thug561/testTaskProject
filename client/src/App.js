import './App.css';
import React, {useEffect, useState} from "react";
import DataFetcher from "./сomponents/DataFetcher";


function App() {
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, []);
  return (
    <div className="App">
        <DataFetcher/>
    </div>
  );
}

export default App;
