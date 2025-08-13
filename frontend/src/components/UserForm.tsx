import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createUser, updateUser } from '../store/userSlice';

interface UserFormProps {
  user?: any; // Optional, for editing existing user
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || 'USER');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setPassword(''); // Password is not pre-filled for security
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { username, email, role, password };

    if (user) {
      // Editing existing user
      dispatch(updateUser({ id: user.id, userData }));
    } else {
      // Creating new user
      dispatch(createUser(userData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          className="form-select"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password {user ? '(leave blank to keep current)' : ''}</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          {...(!user && { required: true })} // Required only for new user
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UserForm;
