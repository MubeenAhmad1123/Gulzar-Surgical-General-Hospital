import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Mail, Phone, MessageSquare, 
  Filter, Search, RefreshCw, LogOut, CheckCircle, 
  XCircle, AlertCircle, Loader2, Download, Eye 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [authError, setAuthError] = useState('');

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // Load appointments
  const loadAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
      setFilteredAppointments(data || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
    setLoading(false);
  };

  // Authentication
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      loadAppointments();
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAppointments([]);
    setFilteredAppointments([]);
  };

  // Filter appointments
  useEffect(() => {
    let filtered = appointments;

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.phone.includes(searchTerm) ||
        apt.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, statusFilter, appointments]);

  // Update appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Refresh appointments
      loadAppointments();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Date', 'Time', 'Service', 'Status', 'Message', 'Booked On'];
    const csvData = filteredAppointments.map(apt => [
      apt.name,
      apt.email,
      apt.phone,
      apt.appointment_date,
      apt.appointment_time,
      apt.service,
      apt.status,
      apt.message || 'N/A',
      new Date(apt.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Statistics
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    confirmed: appointments.filter(a => a.status === 'Confirmed').length,
    cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border border-emerald-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Gulzar Hospital Appointments</p>
          </div>

          {authError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{authError}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              placeholder="Enter admin password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login to Dashboard
          </button>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              Gulzar Hospital and Laser Aesthetic Center<br />
              Madina Colony, Vehari
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-emerald-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">Appointments Dashboard</h1>
              <p className="text-slate-600">Gulzar Hospital and Laser Aesthetic Center</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadAppointments}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors font-medium"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
          <div className="bg-amber-50 rounded-xl shadow-md p-4 border border-amber-100">
            <div className="text-2xl font-bold text-amber-700">{stats.pending}</div>
            <div className="text-sm text-amber-600">Pending</div>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow-md p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-700">{stats.confirmed}</div>
            <div className="text-sm text-emerald-600">Confirmed</div>
          </div>
          <div className="bg-red-50 rounded-xl shadow-md p-4 border border-red-100">
            <div className="text-2xl font-bold text-red-700">{stats.cancelled}</div>
            <div className="text-sm text-red-600">Cancelled</div>
          </div>
          <div className="bg-blue-50 rounded-xl shadow-md p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-700">{stats.completed}</div>
            <div className="text-sm text-blue-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-emerald-100">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Search className="inline w-4 h-4 mr-1" />
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, email, phone, service..."
                className="w-full px-4 py-2 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={exportToCSV}
                disabled={filteredAppointments.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl text-slate-600 font-semibold">No appointments found</p>
                <p className="text-slate-500">Try adjusting your filters</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-emerald-50 border-b-2 border-emerald-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Appointment</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{appointment.name}</div>
                            <div className="text-sm text-slate-500">ID: {appointment.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{appointment.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{appointment.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-700">{appointment.appointment_date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-700">{appointment.appointment_time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700 max-w-xs truncate">
                          {appointment.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={appointment.status}
                          onChange={(e) => updateStatus(appointment.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${
                            appointment.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            appointment.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            appointment.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAppointment(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Appointment Details</h2>
              <p className="text-emerald-100">Full information and notes</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Patient Name</label>
                  <p className="text-lg font-semibold text-slate-800">{selectedAppointment.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Status</label>
                  <p className={`text-lg font-semibold ${
                    selectedAppointment.status === 'Pending' ? 'text-amber-600' :
                    selectedAppointment.status === 'Confirmed' ? 'text-emerald-600' :
                    selectedAppointment.status === 'Cancelled' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>{selectedAppointment.status}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <p className="text-slate-800">{selectedAppointment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Phone
                  </label>
                  <p className="text-slate-800">{selectedAppointment.phone}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <p className="text-slate-800">{selectedAppointment.appointment_date}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Time
                  </label>
                  <p className="text-slate-800">{selectedAppointment.appointment_time}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600">Service</label>
                <p className="text-slate-800">{selectedAppointment.service}</p>
              </div>

              {selectedAppointment.message && (
                <div>
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> Additional Notes
                  </label>
                  <p className="text-slate-800 bg-slate-50 p-4 rounded-xl">{selectedAppointment.message}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-semibold text-slate-600">Booked On</label>
                  <p className="text-sm text-slate-800">{new Date(selectedAppointment.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">Last Updated</label>
                  <p className="text-sm text-slate-800">{new Date(selectedAppointment.updated_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                >
                  Close
                </button>
                <a
                  href={`tel:${selectedAppointment.phone}`}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-center"
                >
                  Call Patient
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}