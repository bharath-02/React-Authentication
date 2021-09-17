import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import { useToken } from '../auth/useToken';

export const LoginPage = () => {
    const [token, setToken] = useToken ();

    const [error, setError] = useState ('');

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    const history = useHistory ('');

    const handleLogin = async () => {
        const response = await axios.post ('http://localhost:4000/api/login', {
            email: email,
            password: password
        });

        const { token } = response.data;
        setToken (token);
        history.push ('/');
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>

            {error && <div className="fail">{error}</div>}

            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password" />
            
            <hr />
            
            <button
                disabled={!email || !password}
                onClick={handleLogin}>Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => history.push('/register')}>Don't have an account? Sign Up</button>
        </div>
    )
}