import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminmainPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // API 호출
        axios.get('/adminpage')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Main Page</h1>
            {data ? (
                <div>
                    <h2>Admin Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default AdminmainPage;
