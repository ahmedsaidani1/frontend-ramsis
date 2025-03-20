import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Car, Users, Calendar, CheckCircle, LogOut, Upload, X } from 'lucide-react';
import Layout from '../components/Layout';
import { Car as CarType } from '../data/cars';
import { API_URL, normalizeImageUrl } from '../config/api';

interface Reservation {
  _id: string;
  vehicleId: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  licenseNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'en attente' | 'en cours' | 'terminé';
  createdAt: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<CarType[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<CarType> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'reservations'>('vehicles');
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    gallery: [] as string[],
    features: ['', '', ''],
    rating: 5,
    isPopular: false,
    specs: {
      transmission: '',
      fuel: '',
      power: '',
      seats: 5,
      consumption: '',
      luggage: ''
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  useEffect(() => {
    fetchVehicles();
    fetchReservations();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_URL}/vehicles`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_URL}/reservations`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG and GIF files are allowed');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      const data = await response.json();
      setFormData(prev => ({ ...prev, image: normalizeImageUrl(data.imageUrl) }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 3) {
      alert('You can only upload up to 3 images at once');
      return;
    }

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Each file must be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG and GIF files are allowed');
        return;
      }
    }

    setIsUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch(`${API_URL}/upload-multiple`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      
      const data = await response.json();
      const normalizedUrls = data.imageUrls.map((url: string) => normalizeImageUrl(url));
      
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, ...normalizedUrls]
      }));
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload gallery images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        image: formData.image,
        gallery: formData.gallery
      };

      const url = isEditing 
        ? `${API_URL}/vehicles/${currentVehicle?._id}`
        : `${API_URL}/vehicles`;
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save vehicle');
      }

      await fetchVehicles();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert(error instanceof Error ? error.message : 'Failed to save vehicle. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await fetch(`${API_URL}/vehicles/${id}`, {
          method: 'DELETE',
        });
        fetchVehicles();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await fetch(`${API_URL}/reservations/${id}`, {
          method: 'DELETE',
        });
        fetchReservations();
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const handleUpdateReservationStatus = async (id: string, newStatus: 'en attente' | 'en cours' | 'terminé') => {
    try {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReservations();
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      gallery: [],
      features: ['', '', ''],
      rating: 5,
      isPopular: false,
      specs: {
        transmission: '',
        fuel: '',
        power: '',
        seats: 5,
        consumption: '',
        luggage: ''
      }
    });
    setCurrentVehicle(null);
    setIsEditing(false);
  };

  const editVehicle = (vehicle: CarType) => {
    setCurrentVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      price: vehicle.price,
      description: vehicle.description,
      image: vehicle.image,
      gallery: vehicle.gallery || [],
      features: vehicle.features,
      rating: vehicle.rating,
      isPopular: vehicle.isPopular || false,
      specs: vehicle.specs
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en cours':
        return 'bg-blue-100 text-blue-800';
      case 'terminé':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Total des Vehicles', value: vehicles.length, icon: Car, color: 'bg-blue-500' },
                { title: 'Locations Actives', value: reservations.filter(r => r.status === 'en cours').length, icon: Calendar, color: 'bg-green-500' },
                { title: 'Réservations en Attente', value: reservations.filter(r => r.status === 'en attente').length, icon: Users, color: 'bg-yellow-500' },
                { title: 'Locations Terminées', value: reservations.filter(r => r.status === 'terminé').length, icon: CheckCircle, color: 'bg-red-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'vehicles'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'reservations'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Reservations
            </button>
          </div>

          {activeTab === 'vehicles' ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Gestion des Vehicles </h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsModalOpen(true);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter Vehicle</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix/Jour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={normalizeImageUrl(vehicle.image)} 
                                alt={vehicle.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                              <div className="text-sm text-gray-500">{vehicle.specs.transmission} • {vehicle.specs.fuel}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{vehicle.price} DT</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editVehicle(vehicle)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(vehicle._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Reservations Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation) => (
                      <tr key={reservation._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reservation.vehicleName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">phone number: {reservation.licenseNumber}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.pickupLocation} → {reservation.dropoffLocation}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <select
                              value={reservation.status}
                              onChange={(e) => handleUpdateReservationStatus(reservation._id, e.target.value as 'en attente' | 'en cours' | 'terminé')}
                              className="text-sm border rounded-md px-2 py-1"
                            >
                              <option value="en attente">En attente</option>
                              <option value="en cours">En cours</option>
                              <option value="terminé">Terminé</option>
                            </select>
                            <button
                              onClick={() => handleDeleteReservation(reservation._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Marque et Modéle</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix Par Jour</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image principale</label>
                <div className="mt-1 flex items-center space-x-4">
                  {formData.image && (
                    <img 
                      src={normalizeImageUrl(formData.image)} 
                      alt="Preview" 
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <label className="cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-red-500 transition-colors">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">Choisir image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploading && <span className="text-gray-500">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">images de gallerie</label>
                <div className="mt-1">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {formData.gallery.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={normalizeImageUrl(url)} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-red-500 transition-colors inline-block">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">Ajouter les photos de gallerie</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="hidden"
                    />
                  </label>
                  {isUploading && <span className="text-gray-500">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <input
                      key={index}
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      placeholder={`Feature ${index + 1}`}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transmission</label>
                  <select
                    value={formData.specs.transmission}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, transmission: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select transmission</option>
                    <option value="Manuelle">Manual</option>
                    <option value="Automatique">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carburant</label>
                  <select
                    value={formData.specs.fuel}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, fuel: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Carburant</option>
                    <option value="Essence">essence</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Consumption</label>
                  <input
                    type="text"
                    value={formData.specs.consumption}
                    onChange={(e) => setFormData({
                      ...formData,
                      specs: { ...formData.specs, consumption: e.target.value }
                    })}
                    placeholder="exemple:6.5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900">
                  Voiture Populaire
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {isEditing ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}