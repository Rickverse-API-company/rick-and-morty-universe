import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GithubAuthProvider,
    signInWithPopup
} from 'firebase/auth';
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

    const handleGitHubRegister = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('GitHub user registered:', result.user);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during GitHub registration:', err);
                setError(err.message);
            });
    };

    return (
        <div className='login-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='login-form'>
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
                {error && <p className="error">{error}</p>}
            </form>
            <br/>
            <button onClick={handleGitHubRegister}>Register with GitHub</button>
        </div>
    );
};

export default Register;
