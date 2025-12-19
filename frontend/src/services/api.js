import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const contactAPI = {
  // Get all contacts
  getAll: (page = 1) => api.get(`/contacts?page=${page}`),

  // Get single contact
  getOne: (id) => api.get(`/contacts/${id}`),

  // Create new contact
  create: (formData) =>
    api.post("/contacts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Update contact
  update: (id, formData) =>
    api.post(`/contacts/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Delete contact
  delete: (id) => api.delete(`/contacts/${id}`),
};

export default api;
