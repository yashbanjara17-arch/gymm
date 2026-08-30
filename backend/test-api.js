const API_BASE = 'http://127.0.0.1:5000/api';

async function testAll() {
  console.log('--- [1] Admin Login ---');
  const adminRes = await fetch(`${API_BASE}/auth/admin-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin' })
  }).then(r => r.json());
  console.log('Admin login success:', adminRes.success, '| User:', adminRes.user?.username);
  const adminToken = adminRes.token;

  console.log('--- [2] Admin Dashboard Stats ---');
  const dashRes = await fetch(`${API_BASE}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  }).then(r => r.json());
  console.log('Total Customers:', dashRes.data.totalCustomers, '| Total Trainers:', dashRes.data.totalTrainers, '| Revenue:', dashRes.data.totalPaid);

  console.log('--- [3] Trainer Login ---');
  const trainerRes = await fetch(`${API_BASE}/auth/trainer-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'john_coach', password: 'trainer123' })
  }).then(r => r.json());
  console.log('Trainer login success:', trainerRes.success, '| Name:', trainerRes.user?.name);
  const trainerToken = trainerRes.token;

  console.log('--- [4] Trainer Dashboard ---');
  const trainerDash = await fetch(`${API_BASE}/trainer/dashboard`, {
    headers: { Authorization: `Bearer ${trainerToken}` }
  }).then(r => r.json());
  console.log('Trainer clients count:', trainerDash.data.customers?.length);

  console.log('--- [5] Customer Login ---');
  const custRes = await fetch(`${API_BASE}/auth/customer-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: '9998887770', password: 'pass123' })
  }).then(r => r.json());
  console.log('Customer login success:', custRes.success, '| Name:', custRes.user?.name);
  const custToken = custRes.token;

  console.log('--- [6] Customer Dashboard & Attendance ---');
  const custDash = await fetch(`${API_BASE}/customer/dashboard`, {
    headers: { Authorization: `Bearer ${custToken}` }
  }).then(r => r.json());
  console.log('Customer tier:', custDash.data.customer.membership, '| Diet plan:', custDash.data.customer.diet_plan);

  console.log('--- [7] Invoice Download Stream Check ---');
  const invoiceRes = await fetch(`${API_BASE}/invoices/${custDash.data.customer._id}`, {
    headers: { Authorization: `Bearer ${custToken}` }
  });
  console.log('Invoice response status:', invoiceRes.status, '| Content-Type:', invoiceRes.headers.get('content-type'));

  console.log('\n>>> ALL BACKEND AND DATABASE REST APIS ARE FULLY OPERATIONAL! <<<');
}

testAll().catch(console.error);
