import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export const SignupPage = () => {
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory('');

    const handleSignup = async () => {
        alert('Sign up not implemented yet');
    }

    return (
        <div className="content-container">
            <h1>Sign Up</h1>

            {error && <div className="fail">{error}</div>}

            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username" />
            <input
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password" />
            <input
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="confirm password" />

            <hr />
            
            <button
                disabled={
                    !email || !password ||
                    password !== confirmPassword
                }
                onClick={handleSignup}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log In</button>
        </div>
    )
}