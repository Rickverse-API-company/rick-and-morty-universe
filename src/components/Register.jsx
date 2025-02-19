import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (displayName) {
                    updateProfile(user, { displayName })
                        .then(() => console.log('Profile updated'))
                        .catch((err) => console.error('Error updating profile:', err));
                }
                console.log('User registered:', user);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during registration:', err);
                setError(err.message);
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name (optional)"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
