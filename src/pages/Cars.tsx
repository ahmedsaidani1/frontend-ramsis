import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import { Car } from '../data/cars';
import { API_URL } from '../config/api';

export default function Cars() {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    transmission: '',
    fuel: '',
    minPrice: '',
    maxPrice: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchVehicles();
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

  const filteredCars = vehicles.filter(car => {
    if (filters.transmission && car.specs.transmission !== filters.transmission) return false;
    if (filters.fuel && car.specs.fuel !== filters.fuel) return false;
    if (filters.minPrice && parseInt(car.price) < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && parseInt(car.price) > parseInt(filters.maxPrice)) return false;
    return true;
  });

  return (
    <Layout>
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Nos Voitures</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filtres</span>
            </button>
          </div>

          {/* Filters */}
          <div className={`bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                >
                  <option value="">Tous</option>
                  <option value="Manuelle">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
                <select
                  value={filters.fuel}
                  onChange={(e) => setFilters(prev => ({ ...prev, fuel: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                >
                  <option value="">Tous</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix min (DT)</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix max (DT)</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.slice(0, 4).map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-red-600">{car.price} DT</span>
                      <span className="text-gray-500 text-sm">/jour</span>
                    </div>
                    <Link 
                      to={`/cars/${car._id}`}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <span>Détails</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}