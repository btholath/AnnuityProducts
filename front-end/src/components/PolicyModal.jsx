// components/PolicyModal.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PolicyModal({ show, onClose, onSave, policy, setPolicy, isEdit }) {
  return (
    <Modal show={show} onHide={onClose} animation>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Policy' : 'Add Policy'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="mb-2" placeholder="Policy Number" value={policy.policy_number} onChange={e => setPolicy({ ...policy, policy_number: e.target.value })} />
          <Form.Control className="mb-2" placeholder="Type" value={policy.type} onChange={e => setPolicy({ ...policy, type: e.target.value })} />
          <Form.Control className="mb-2" placeholder="Customer Name" value={policy.customer.name} onChange={e => setPolicy({ ...policy, customer: { ...policy.customer, name: e.target.value } })} />
          <Form.Control className="mb-2" type="number" placeholder="Premium" value={policy.premium} onChange={e => setPolicy({ ...policy, premium: Number(e.target.value) })} />
          <Form.Control className="mb-2" placeholder="Payout Frequency" value={policy.payout_frequency} onChange={e => setPolicy({ ...policy, payout_frequency: e.target.value })} />
          <Form.Control className="mb-2" type="number" placeholder="Payout Amount" value={policy.payout_amount} onChange={e => setPolicy({ ...policy, payout_amount: Number(e.target.value) })} />
          <Form.Control className="mb-2" type="date" value={policy.start_date} onChange={e => setPolicy({ ...policy, start_date: e.target.value })} />
          <Form.Select className="mb-2" value={policy.status} onChange={e => setPolicy({ ...policy, status: e.target.value })}>
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Lapsed">Lapsed</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onSave}>{isEdit ? 'Update' : 'Add'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PolicyModal;
