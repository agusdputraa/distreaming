import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks';

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const isEdit = !!id;
  
  const { users, createUser, updateUser, deleteUser } = useUsers();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Load user data when editing
  useEffect(() => {
    if (!isEdit) return;
    
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: ''
      });
    }
  }, [id, isEdit, users]);

  // Form field update helper
  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Save user (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    
    // Validate password match
    if (form.password && form.password !== form.password_confirmation) {
      setMsg('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Validate password for create mode
    if (!isEdit && !form.password) {
      setMsg('Password is required');
      setLoading(false);
      return;
    }
    
    try {
      const userData = {
        name: form.name,
        email: form.email
      };
      
      // Only include password if provided
      if (form.password) {
        userData.password = form.password;
        userData.password_confirmation = form.password_confirmation;
      }
      
      if (isEdit) {
        await updateUser(id, userData);
      } else {
        await createUser(userData);
      }
      
      setMsg('Saved!');
      setTimeout(() => navigate('/admin/users'), 600);
    } catch (err) {
      console.error('Save error:', err);
      setMsg(err?.response?.data?.message || 'Error saving user');
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await deleteUser(id);
      navigate('/admin/users');
    } catch (err) {
      console.error('Delete error:', err);
      setMsg('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">
              {isEdit ? 'Edit User' : 'Add User'}
            </h1>
            <button
              onClick={() => navigate('/admin/users')}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="x" size={24} />
            </button>
          </div>
          
          {/* Form */}
          <div className="bg-black/60 rounded-lg p-6 border border-gray-800">
            <form onSubmit={handleSave} className="space-y-4">
              <FormInput
                label="Name"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                required
                autoComplete="name"
              />
              
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                required
                autoComplete="email"
              />
              
              <FormInput
                label={isEdit ? "New Password (leave blank to keep current)" : "Password"}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                required={!isEdit}
                autoComplete="new-password"
              />
              
              <FormInput
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={form.password_confirmation}
                onChange={(e) => setField('password_confirmation', e.target.value)}
                required={!isEdit || !!form.password}
                autoComplete="new-password"
              />
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#e50914] text-white rounded-md text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-[#f40612]"
                >
                  <Icon name="save" size={16} />
                  {loading ? 'Saving...' : 'Save User'}
                </button>
                
                {isEdit && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-3 bg-gray-700 text-white rounded-md text-sm hover:bg-red-600 disabled:opacity-50"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                )}
              </div>
            </form>
            
            {/* Status Message */}
            {msg && (
              <p className={`mt-4 text-center text-sm ${
                msg === 'Saved!' ? 'text-green-400' : 'text-red-400'
              }`}>
                {msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
