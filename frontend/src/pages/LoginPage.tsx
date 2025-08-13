import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/authSlice';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-header text-center">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {status === 'failed' && error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
