import React from 'react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const GitHubLogin = () => {
    const navigate = useNavigate();

    const handleGitHubLogin = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('GitHub User:', result.user);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error with GitHub login:', error);
            });
    };

    return (
        <button onClick={handleGitHubLogin}>
            Login with GitHub
        </button>
    );
};

export default GitHubLogin;
