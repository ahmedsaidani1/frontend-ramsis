import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Fuel, Users, Settings, X } from 'lucide-react';
import Layout from '../components/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { Car } from '../data/cars';
import { API_URL } from '../config/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (isSlideOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSlideOpen]);

  const fetchCar = async () => {
    try {
      const response = await fetch(`${API_URL}/vehicles/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCar(data);
      setSelectedImage(data.gallery[0]);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId: car?._id,
          vehicleName: car?.name,
          startDate,
          endDate,
          licenseNumber,
          pickupLocation,
          dropoffLocation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      setSubmitSuccess(true);
      setStartDate('');
      setEndDate('');
      setLicenseNumber('');
      setPickupLocation('');
      setDropoffLocation('');
      setShowBookingForm(false);
    } catch (error) {
      setSubmitError('Failed to create reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Voiture non trouvée</h1>
            <Link to="/cars" className="text-red-600 hover:text-red-700">
              Retour à la liste des voitures
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/cars"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux voitures</span>
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <img 
                    src={selectedImage || car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                 
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {car.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        selectedImage === image ? 'ring-2 ring-red-600' : ''
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${car.name} - Vue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                  <p className="text-gray-600">{car.description}</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-red-600">{car.price} DT</span>
                  <span className="text-gray-500 text-lg ml-2">/jour</span>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Settings className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-medium">{car.specs.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Fuel className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Carburant</p>
                      <p className="font-medium">{car.specs.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Fuel className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Consomation</p>
                      <p className="font-medium">{car.specs.consumption}L/100km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Places</p>
                      <p className="font-medium">{car.specs.seats} sièges</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Équipements</h2>
                  <div className="grid grid-cols-2 gap-y-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSlideOpen(true);
                    setShowBookingForm(false);
                  }}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Panel */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isSlideOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSlideOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${
            isSlideOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{car.name}</h2>
              <button
                onClick={() => setIsSlideOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {!showBookingForm ? (
                <>
                  <Swiper
                    modules={[Navigation, Pagination, EffectFade, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    effect="fade"
                    autoplay={{ delay: 3000 }}
                    className="h-64 rounded-lg mb-6"
                  >
                    {car.gallery.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img 
                          src={image} 
                          alt={`${car.name} - Vue ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">Transmission</h3>
                      <p>{car.specs.transmission}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Carburant</h3>
                      <p>{car.specs.fuel}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Puissance</h3>
                      <p>{car.specs.power}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Prix par jour</h3>
                      <p className="text-2xl font-bold text-red-600">{car.price} DT</p>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      min={startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de telephone
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agence de départ
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      required
                    >
                      <option value="">Sélectionnez une agence</option>
                      <option value="Aeroport Tunis Carthage">Aeroport Tunis Carthage</option>
                      <option value="Manzah 6 ">Manzah 6 </option>
                      <option value="Chotrana">Chotrana</option>
                   
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agence de retour
                    </label>
                    <select
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                      required
                    >
                      <option value="">Sélectionnez une agence</option>
                       <option value="Aeroport Tunis Carthage">Aeroport Tunis Carthage</option>
                      <option value="Manzah 6 ">Manzah 6 </option>
                      <option value="Chotrana">Chotrana</option>
                    </select>
                  </div>
                  {submitError && (
                    <div className="text-red-600 text-sm">{submitError}</div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 flex-shrink-0">
            {!showBookingForm ? (
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Réserver
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Traitement...' : 'Confirmer'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}