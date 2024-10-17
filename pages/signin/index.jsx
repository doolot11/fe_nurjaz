import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function index() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        // Basic client-side validation
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        // Send the data to the server or handle it in some way
        try {
            const response = await fetch('http://localhost:3001/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("nurjaz_data", JSON.stringify(result._id))
                router.push(`/admin`)
            } else {
                setError(result.message || 'Sign-in failed');
            }
        } catch (error) {
            setError('An error occurred during sign-in');
        }
    };

    return (
        <Box>
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
                <h2>Sign In</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>

                    <Button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Box>
    )
}

export default index