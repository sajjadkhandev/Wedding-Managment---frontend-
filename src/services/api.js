import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Pre-configured Axios instance with cookies enabled
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send and receive HTTP-only auth cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to format errors cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message ||
      error.message ||
      'Unable to connect to WedPlan API server.';
    return Promise.reject(new Error(customMessage));
  }
);

// Authentication API methods
export const authApi = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  registerCustomer: async (customerData) => {
    const res = await api.post('/auth/register', customerData);
    return res.data;
  },
  registerVendor: async (vendorData) => {
    const res = await api.post('/auth/register-vendor', vendorData);
    return res.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await api.patch('/auth/profile', profileData);
    return res.data;
  }
};

// Service Categories API
export const categoryApi = {
  getCategories: async () => {
    const res = await api.get('/categories');
    return res.data;
  }
};

// Marketplace Services API
export const serviceApi = {
  getServices: async (params = {}) => {
    const res = await api.get('/services', { params });
    return res.data;
  },
  getServiceById: async (id) => {
    const res = await api.get(`/services/${id}`);
    return res.data;
  },
  createService: async (serviceData) => {
    const res = await api.post('/services', serviceData);
    return res.data;
  },
  updateService: async (id, serviceData) => {
    const res = await api.put(`/services/${id}`, serviceData);
    return res.data;
  },
  deleteService: async (id) => {
    const res = await api.delete(`/services/${id}`);
    return res.data;
  },
  addPackage: async (serviceId, packageData) => {
    const res = await api.post(`/services/${serviceId}/packages`, packageData);
    return res.data;
  },
  getPackages: async (serviceId) => {
    const res = await api.get(`/services/${serviceId}/packages`);
    return res.data;
  }
};

// Vendor Directory API
export const vendorApi = {
  getVendors: async (params = {}) => {
    const res = await api.get('/vendors', { params });
    return res.data;
  },
  getVendorById: async (id) => {
    const res = await api.get(`/vendors/${id}`);
    return res.data;
  },
  getMyProfile: async () => {
    const res = await api.get('/vendors/profile/me');
    return res.data;
  },
  updateMyProfile: async (profileData) => {
    const res = await api.put('/vendors/profile/me', profileData);
    return res.data;
  }
};

// Customer Wedding Projects & Events API
export const weddingApi = {
  getMyProjects: async () => {
    const res = await api.get('/weddings');
    return res.data;
  },
  createProject: async (projectData) => {
    const res = await api.post('/weddings', projectData);
    return res.data;
  },
  getProjectById: async (id) => {
    const res = await api.get(`/weddings/${id}`);
    return res.data;
  },
  updateProject: async (id, projectData) => {
    const res = await api.put(`/weddings/${id}`, projectData);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/weddings/${id}`);
    return res.data;
  },
  addEvent: async (projectId, eventData) => {
    const res = await api.post(`/weddings/${projectId}/events`, eventData);
    return res.data;
  },
  updateEvent: async (eventId, eventData) => {
    const res = await api.put(`/weddings/events/${eventId}`, eventData);
    return res.data;
  },
  deleteEvent: async (eventId) => {
    const res = await api.delete(`/weddings/events/${eventId}`);
    return res.data;
  }
};

// Booking Engine API
export const bookingApi = {
  createBooking: async (bookingData) => {
    const res = await api.post('/bookings', bookingData);
    return res.data;
  },
  getMyBookings: async (params = {}) => {
    const res = await api.get('/bookings', { params });
    return res.data;
  },
  getBookingById: async (id) => {
    const res = await api.get(`/bookings/${id}`);
    return res.data;
  },
  updateBookingStatus: async (id, data) => {
    const res = await api.patch(`/bookings/${id}/status`, data);
    return res.data;
  },
  checkAvailability: async (params) => {
    const res = await api.get('/bookings/check-availability', { params });
    return res.data;
  }
};

// Planning Hub API (Guests, Budget/Expenses, Tasks Checklist)
export const planningApi = {
  // Guests
  getGuests: async (projectId, params = {}) => {
    const res = await api.get(`/planning/projects/${projectId}/guests`, { params });
    return res.data;
  },
  createGuest: async (projectId, guestData) => {
    const res = await api.post(`/planning/projects/${projectId}/guests`, guestData);
    return res.data;
  },
  updateRSVP: async (guestId, rsvpData) => {
    const res = await api.patch(`/planning/guests/${guestId}/rsvp`, rsvpData);
    return res.data;
  },
  deleteGuest: async (guestId) => {
    const res = await api.delete(`/planning/guests/${guestId}`);
    return res.data;
  },

  // Expenses & Budget
  getExpenses: async (projectId) => {
    const res = await api.get(`/planning/projects/${projectId}/expenses`);
    return res.data;
  },
  createExpense: async (projectId, expenseData) => {
    const res = await api.post(`/planning/projects/${projectId}/expenses`, expenseData);
    return res.data;
  },
  deleteExpense: async (expenseId) => {
    const res = await api.delete(`/planning/expenses/${expenseId}`);
    return res.data;
  },

  // Tasks & Checklist
  getTasks: async (projectId) => {
    const res = await api.get(`/planning/projects/${projectId}/tasks`);
    return res.data;
  },
  createTask: async (projectId, taskData) => {
    const res = await api.post(`/planning/projects/${projectId}/tasks`, taskData);
    return res.data;
  },
  toggleTask: async (taskId) => {
    const res = await api.patch(`/planning/tasks/${taskId}/toggle`);
    return res.data;
  },
  deleteTask: async (taskId) => {
    const res = await api.delete(`/planning/tasks/${taskId}`);
    return res.data;
  }
};

// Customer Reviews & Ratings API
export const reviewApi = {
  getVendorReviews: async (vendorId) => {
    const res = await api.get(`/reviews/vendor/${vendorId}`);
    return res.data;
  },
  createReview: async (reviewData) => {
    const res = await api.post('/reviews', reviewData);
    return res.data;
  },
  replyToReview: async (reviewId, replyData) => {
    const res = await api.post(`/reviews/${reviewId}/reply`, replyData);
    return res.data;
  }
};

// In-App Notifications API
export const notificationApi = {
  getMyNotifications: async () => {
    const res = await api.get('/notifications');
    return res.data;
  },
  markAsRead: async (id) => {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  },
  markAllAsRead: async () => {
    const res = await api.patch('/notifications/read-all');
    return res.data;
  }
};

// Payments & Invoice Receipts API
export const paymentApi = {
  getMyPayments: async () => {
    const res = await api.get('/payments');
    return res.data;
  },
  recordPayment: async (paymentData) => {
    const res = await api.post('/payments', paymentData);
    return res.data;
  },
  getPaymentInvoice: async (id) => {
    const res = await api.get(`/payments/${id}/invoice`);
    return res.data;
  }
};

// Admin Governance & Auditing API
export const adminApi = {
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },
  getVendors: async (params = {}) => {
    const res = await api.get('/admin/vendors', { params });
    return res.data;
  },
  verifyVendor: async (id, data) => {
    const res = await api.patch(`/admin/vendors/${id}/verify`, data);
    return res.data;
  },
  getAuditLogs: async () => {
    const res = await api.get('/admin/audit-logs');
    return res.data;
  }
};

// Real-Time Concierge Chat API
export const chatApi = {
  sendMessage: async (message, context = {}) => {
    const res = await api.post('/chat/message', { message, context });
    return res.data;
  },
  getQuickPrompts: async () => {
    const res = await api.get('/chat/quick-prompts');
    return res.data;
  }
};

export default api;
