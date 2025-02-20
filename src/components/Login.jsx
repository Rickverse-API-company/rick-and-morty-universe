import React, { useState } from 'react';
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import GitHubLogin from './GitHubLogin';
import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        setPersistence(auth, persistence)
            .then(() => signInWithEmailAndPassword(auth, email, password))
            .then((userCredential) => {
                console.log('User Logged:', userCredential.user);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error login:', err);
                setError(err.message);
            });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                
                <button type="submit">Login</button>

                <label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                </label>
                {error && <p className="error">{error}</p>}
            </form>
            <br/>
            <GitHubLogin />
        </div>
    );
};

export default Login;
