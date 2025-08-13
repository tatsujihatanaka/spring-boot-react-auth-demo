import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, deleteUser } from '../store/userSlice';
import UserForm from '../components/UserForm';

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
    dispatch(fetchUsers()); // Refresh users after modal closes
  };

  if (status === 'loading') {
    return <div>Loading users...</div>;
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <button className="btn btn-primary" onClick={handleAddUser}>Add New User</button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentUser ? 'Edit User' : 'Add New User'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <UserForm user={currentUser} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
