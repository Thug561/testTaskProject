import React, { useState, useRef } from 'react';
import axios from 'axios';

function DataFetcher() {
    const [concurrency, setConcurrency] = useState(10);
    const [results, setResults] = useState([]);
    const [isStarted, setIsStarted] = useState(false);

    const totalRequests = 1000;
    const requestQueue = useRef([]);
    const activeRequests = useRef(0);

    const handleStart = () => {
        if (isStarted) return;

        setIsStarted(true);
        setResults([]);
        activeRequests.current = 0;
        requestQueue.current = Array.from({ length: totalRequests }, (_, i) => i + 1);
        processRequests();
    };

    const processRequests = () => {
        if (requestQueue.current.length === 0) {
            setIsStarted(false);
            return;
        }

        while (activeRequests.current < concurrency && requestQueue.current.length > 0) {
            const index = requestQueue.current.shift();
            sendRequest(index);
        }

        setTimeout(processRequests, 1000);
    };

    const sendRequest = async (index) => {
        activeRequests.current++;
        try {
          await axios.get(`/api?index=${index}`);
            setResults(currentResults => [...currentResults, `Request ${index} completed`]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            activeRequests.current--;
        }
    };
    return (
        <div>
            <style>
                {`
                .DataFetcher {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #f0f0f0;
                    color: #333;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    justify-content: center;
                }

                .DataFetcher input[type="number"] {
                    padding: 8px;
                    margin: 10px 0;
                    width: 200px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    text-align: center;
                }

                .DataFetcher button {
                    padding: 10px 20px;
                    background-color: #5cb85c;
                    border: none;
                    border-radius: 5px;
                    color: white;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .DataFetcher button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }

                .DataFetcher ul {
                    list-style: none;
                    padding: 0;
                    max-width: 300px;
                    margin-top: 20px;
                }

                .DataFetcher li {
                    background-color: white;
                    padding: 10px;
                    margin-bottom: 5px;
                    border-radius: 5px;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                `}
            </style>
            <div className="DataFetcher">
                <input
                    type="number"
                    value={concurrency}
                    onChange={e => setConcurrency(Math.min(100, Math.max(0, parseInt(e.target.value, 10))))}
                    min="0"
                    max="100"
                    required
                    disabled={isStarted}
                />
                <button onClick={handleStart} disabled={isStarted}>Start</button>
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DataFetcher;
