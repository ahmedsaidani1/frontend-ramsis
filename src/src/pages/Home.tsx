import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import Layout from '../components/Layout';
import { Car } from '../data/cars';
import { API_URL } from '../config/api';
export default function Home() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [showSearchError, setShowSearchError] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDate ||
      !dropoffDate ||
      !pickupTime ||
      !dropoffTime
    ) {
      setShowSearchError(true);
      setTimeout(() => setShowSearchError(false), 3000);
      return;
    }
    navigate('/cars');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
            alt="Luxury car" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-start justify-center min-h-[calc(100vh-4rem)] md:min-h-screen px-4 md:px-6 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-8 md:mb-0 w-full">
            <h1 className="text-3xl md:text-7xl font-bold text-white mb-4 md:mb-6">
              Réservez <span className='text-red-600'>la meilleure voiture</span> pour votre voyage
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl">
              Découvrez notre sélection de véhicules premium pour une expérience de conduite exceptionnelle en Tunisie.
            </p>
            <button 
              onClick={() => navigate('/cars')}
              className="w-full md:w-auto inline-flex items-center justify-center bg-red-600 text-white px-6 md:px-8 py-3 text-lg font-semibold hover:bg-red-700 transition-colors rounded-lg group"
            >
              Découvrir nos voitures
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Booking Form */}
        <div className="relative z-20 w-full md:absolute md:bottom-0 md:right-0 md:w-[450px] bg-white/95 p-4 md:p-6 mx-auto md:m-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4 md:mb-6 text-gray-800">Recherchez une voiture</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Agence départ</label>
              <div className="mt-1 relative">
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                >
                  <option value="">Sélectionnez une agence</option>
                  <option value="Aéroport Tunis Carthage">Aéroport Tunis Carthage</option>
                  <option value="Manzah 6">Manzah 6</option>
                  <option value="Chotrana">Chotrana</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Agence retour</label>
              <div className="mt-1 relative">
                <select
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                >
                  <option value="">Sélectionnez une agence</option>
                  <option value="Aéroport Tunis Carthage">Aéroport Tunis Carthage</option>
                  <option value="Manzah 6">Manzah 6</option>
                  <option value="Chotrana">Chotrana</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date départ</label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Heure</label>
                <div className="mt-1 relative">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date retour</label>
                <div className="mt-1 relative">
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Heure</label>
                <div className="mt-1 relative">
                  <input
                    type="time"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow"
                  />
                </div>
              </div>
            </div>
            {showSearchError && (
              <div className="text-red-600 text-sm">
                Veuillez remplir tous les champs du formulaire
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>RECHERCHER</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </header>

      {/* Featured Cars Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Nos Voitures Populaires</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Découvrez notre sélection de véhicules les plus demandés
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {vehicles.filter(car => car.isPopular).map((car) => (
              <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 md:px-3 py-1 bg-gray-100 text-xs md:text-sm rounded-full text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-red-600">{car.price} DT</span>
                      <span className="text-gray-500 text-xs md:text-sm">/jour</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/cars/${car._id}`)}
                      className="bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm md:text-base"
                    >
                      <span>Détails</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={() => navigate('/cars')}
              className="inline-flex items-center bg-red-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
            >
              <span>Voir toutes nos voitures</span>
              <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}