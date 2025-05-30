// AppContent.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import PolicyModal from './components/PolicyModal';
import SearchBar from './components/SearchBar';
import PolicyTable from './components/PolicyTable';
import ExportButtons from './components/ExportButtons';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { API_BASE_URL } from '../src/utils/env'
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PAGE_SIZE = 5;

function AppContent() {
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [columnsToExport, setColumnsToExport] = useState([]);
  const [allColumns, setAllColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPolicy, setEditPolicy] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    policy_number: '',
    type: '',
    customer: { name: '', age: 0 },
    premium: 0,
    payout_frequency: '',
    payout_amount: 0,
    start_date: '',
    status: 'Active',
  });

  const flatten = (obj, path = '') =>
    Object.keys(obj).reduce((acc, key) => {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flatten(obj[key], newPath));
      } else {
        acc[newPath] = obj[key];
      }
      return acc;
    }, {});

  const loadPolicies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/policies`);
      const data = Array.isArray(res.data) ? res.data : [];
      setPolicies(data);
      setFilteredPolicies(data);
      if (data.length > 0) {
        const flat = flatten(data[0]);
        const keys = Object.keys(flat);
        setColumnsToExport(keys);
        setAllColumns(keys);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
      setPolicies([]);
      setFilteredPolicies([]);
    } finally {
      setLoading(false);
    }
  };

  const validatePolicy = (policy) => {
    if (!policy.policy_number || !policy.type || !policy.customer.name || !policy.premium || !policy.start_date || !policy.status) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const addPolicy = async () => {
    if (!validatePolicy(newPolicy)) return;
    try {
      if (editPolicy) {
        await axios.put(`${API_BASE_URL}/policies/${editPolicy._id}`, newPolicy);
      } else {
        await axios.post(`${API_BASE_URL}/policies`, newPolicy);
      }
      setNewPolicy({
        policy_number: '',
        type: '',
        customer: { name: '', age: 0 },
        premium: 0,
        payout_frequency: '',
        payout_amount: 0,
        start_date: '',
        status: 'Active',
      });
      setEditPolicy(null);
      loadPolicies();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving policy:', error);
    }
  };

  const deletePolicy = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/policies/${id}`);
      loadPolicies();
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  const editPolicyForm = (policy) => {
    setEditPolicy(policy);
    setNewPolicy(policy);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = policies.filter(
      (p) =>
        p.policy_number.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term) ||
        p.status.toLowerCase().includes(term) ||
        p.customer.name.toLowerCase().includes(term)
    );
    setFilteredPolicies(filtered);
    setCurrentPage(1);
  };

  const toggleColumn = (col) => {
    setColumnsToExport((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const paginatedData = filteredPolicies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filteredPolicies.length / PAGE_SIZE);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      loadPolicies();
    }
  }, [authState]);

  const login = () => oktaAuth.signInWithRedirect({ originalUri: '/' });
  const logout = () => oktaAuth.signOut();

  if (!authState) return <div>Loading authentication...</div>;
  if (!authState.isAuthenticated) {
    return (
      <div className="login-screen text-center mt-5">
        <h2>Please log in to continue</h2>
        <button onClick={login} className="btn btn-primary">Login</button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Annuity Policy Manager</h1>
        <button onClick={logout} className="btn btn-outline-danger">Logout</button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onAddClick={() => setShowModal(true)}
      />

      <ExportButtons data={filteredPolicies} columns={columnsToExport} />

      {showSuccess && <div className="alert alert-success mt-3">Policy saved successfully!</div>}

      <PolicyTable
        loading={loading}
        policies={paginatedData}
        columnsToExport={columnsToExport}
        allColumns={allColumns}
        toggleColumn={toggleColumn}
        onEdit={editPolicyForm}
        onDelete={deletePolicy}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <PolicyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={addPolicy}
        policy={newPolicy}
        setPolicy={setNewPolicy}
        isEdit={!!editPolicy}
      />
    </div>
  );
}

export default AppContent;