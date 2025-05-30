import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_SIZE = 5;

function App() {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [columnsToExport, setColumnsToExport] = useState([]);
  const [allColumns, setAllColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState('search');
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

  const flatten = (obj, path = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flatten(obj[key], newPath));
      } else {
        acc[newPath] = obj[key];
      }
      return acc;
    }, {});
  };

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
    setColumnsToExport(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  const paginatedData = filteredPolicies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filteredPolicies.length / PAGE_SIZE);

  useEffect(() => {
    loadPolicies();
  }, []);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Menu</h2>
        <button onClick={() => setActivePage('search')}>Search Policies</button>
        <button onClick={() => {
          setNewPolicy({
            policy_number: '',
            type: '',
            customer: { name: '', age: 0 },
            premium: 0,
            payout_frequency: '',
            payout_amount: 0,
            start_date: '',
            status: 'Active'
          });
          setEditPolicy(null);
          setShowModal(true);
        }}>Add Policy</button>
      </aside>

      <main className="content">
        <h1>Annuity Policy Manager</h1>
        {showSuccess && <div className="success-message show">Policy saved successfully!</div>}

        {activePage === 'search' && (
          <>
            <input
              type="text"
              placeholder="Search by policy number, type, status or customer name"
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
            />

            <div className="column-selector">
              <strong>Select Columns:</strong>
              {allColumns.map(col => (
                <label key={col}>
                  <input type="checkbox" checked={columnsToExport.includes(col)} onChange={() => toggleColumn(col)} /> {col}
                </label>
              ))}
            </div>

            {loading ? (
              <div className="spinner" />
            ) : (
              <div className="table-wrapper">
                <table className="policy-table styled-table">
                  <thead>
                    <tr>
                      {columnsToExport.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((p) => {
                      const flat = flatten(p);
                      return (
                        <tr key={p._id}>
                          {columnsToExport.map((col) => (
                            <td key={col}>{flat[col]}</td>
                          ))}
                          <td>
                            <button onClick={() => editPolicyForm(p)}>Edit</button>
                            <button onClick={() => deletePolicy(p._id)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editPolicy ? 'Edit Policy' : 'Add Policy'}</h2>
              <div className="form">
                <input required placeholder="Policy #" value={newPolicy.policy_number} onChange={(e) => setNewPolicy({ ...newPolicy, policy_number: e.target.value })} />
                <input required placeholder="Type" value={newPolicy.type} onChange={(e) => setNewPolicy({ ...newPolicy, type: e.target.value })} />
                <input required placeholder="Customer Name" value={newPolicy.customer.name} onChange={(e) => setNewPolicy({ ...newPolicy, customer: { ...newPolicy.customer, name: e.target.value } })} />
                <input required placeholder="Customer Age" type="number" value={newPolicy.customer.age} onChange={(e) => setNewPolicy({ ...newPolicy, customer: { ...newPolicy.customer, age: +e.target.value } })} />
                <input required placeholder="Premium" type="number" value={newPolicy.premium} onChange={(e) => setNewPolicy({ ...newPolicy, premium: +e.target.value })} />
                <input required placeholder="Payout Frequency" value={newPolicy.payout_frequency} onChange={(e) => setNewPolicy({ ...newPolicy, payout_frequency: e.target.value })} />
                <input required placeholder="Payout Amount" type="number" value={newPolicy.payout_amount} onChange={(e) => setNewPolicy({ ...newPolicy, payout_amount: +e.target.value })} />
                <input required placeholder="Start Date" type="date" value={newPolicy.start_date} onChange={(e) => setNewPolicy({ ...newPolicy, start_date: e.target.value })} />
                <input required placeholder="Status" value={newPolicy.status} onChange={(e) => setNewPolicy({ ...newPolicy, status: e.target.value })} />
                <button onClick={addPolicy}>{editPolicy ? 'Save Changes' : 'Add Policy'}</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
