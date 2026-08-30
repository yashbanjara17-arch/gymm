import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gym_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiry handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and user if unauthorized
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/') {
        localStorage.removeItem('gym_token');
        localStorage.removeItem('gym_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  adminLogin: (data) => api.post('/auth/admin-login', data),
  trainerLogin: (data) => api.post('/auth/trainer-login', data),
  customerLogin: (data) => api.post('/auth/customer-login', data),
  getMe: () => api.get('/auth/me')
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getCustomers: () => api.get('/admin/customers'),
  getCustomer: (id) => api.get(`/admin/customers/${id}`),
  createCustomer: (data) => api.post('/admin/customers', data),
  updateCustomer: (id, data) => api.put(`/admin/customers/${id}`, data),
  deleteCustomer: (id) => api.delete(`/admin/customers/${id}`),
  recordPayment: (id, data) => api.post(`/admin/customers/${id}/payment`, data),
  recordTrainerFeePayment: (id, data) => api.post(`/admin/customers/${id}/trainer-payment`, data),
  getTrainers: () => api.get('/admin/trainers'),
  createTrainer: (data) => api.post('/admin/trainers', data),
  updateTrainer: (id, data) => api.put(`/admin/trainers/${id}`, data),
  deleteTrainer: (id) => api.delete(`/admin/trainers/${id}`),
  recordGymSalaryPayment: (id, data) => api.post(`/admin/trainers/${id}/salary-payment`, data)
};

export const trainerAPI = {
  getDashboard: () => api.get('/trainer/dashboard'),
  updatePlans: (cid, data) => api.put(`/trainer/customers/${cid}/plans`, data),
  getMessages: (cid) => api.get(`/trainer/messages/${cid}`),
  sendMessage: (cid, data) => api.post(`/trainer/messages/${cid}`, data)
};

export const customerAPI = {
  getDashboard: () => api.get('/customer/dashboard'),
  markAttendance: () => api.post('/customer/mark-attendance'),
  sendMessage: (data) => api.post('/customer/send-message', data),
  makePayment: (data) => api.post('/customer/payment', data)
};

export const attendanceAPI = {
  getCustomersSummary: () => api.get('/attendance/customers'),
  getCustomerDetail: (cid) => api.get(`/attendance/customers/${cid}`),
  markCustomer: (cid, data) => api.post(`/attendance/customers/${cid}`, data),
  getTrainersSummary: () => api.get('/attendance/trainers'),
  getTrainerDetail: (tid) => api.get(`/attendance/trainers/${tid}`),
  markTrainer: (tid, data) => api.post(`/attendance/trainers/${tid}`, data)
};

export const invoiceAPI = {
  downloadInvoiceUrl: (cid) => `/api/invoices/${cid}`
};
