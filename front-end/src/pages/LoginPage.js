import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export const LoginPage = () => {
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory('');

    const handleLogin = async () => {
        alert('Log in not implemented yet');
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
            <button
                disabled={!email || !password}
                onClick={handleLogin}>Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
            <button onClick={() => history.push('/register')}>Don't have an account? Sign Up</button>
        </div>
    )
}