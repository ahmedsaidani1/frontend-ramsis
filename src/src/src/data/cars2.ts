export interface Car {
  _id: string;
  name: string;
  image: string;
  gallery: string[];
  price: string;
  features: string[];
  description: string;
  rating: number;
  specs: {
    transmission: string;
    fuel: string;
    power: string;
    seats: number;
    consumption: string;
    luggage: string;
  };
}

export const cars: Car[] = [
  {
    _id: "1",
    name: "Volkswagen Polo",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80"
    ],
    price: "80",
    features: ["5 Sièges", "Climatisation", "Manuelle", "Diesel", "Bluetooth", "USB", "GPS"],
    description: "La Volkswagen Polo est une voiture compacte idéale pour la ville et les longs trajets. Confortable et économique, elle offre une expérience de conduite agréable et sécurisée.",
    rating: 4.8,
    specs: {
      transmission: "Manuelle",
      fuel: "Diesel",
      power: "95 ch",
      seats: 5,
      consumption: "4.5L/100km",
      luggage: "351L"
    }
  },
  {
    _id: "2",
    name: "Renault Clio",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80"
    ],
    price: "75",
    features: ["5 Sièges", "Climatisation", "Manuelle", "Essence", "Bluetooth", "USB", "Caméra de recul"],
    description: "La Renault Clio offre un excellent rapport qualité-prix avec un confort optimal et une faible consommation. Parfaite pour tous types de trajets.",
    rating: 4.6,
    specs: {
      transmission: "Manuelle",
      fuel: "Essence",
      power: "90 ch",
      seats: 5,
      consumption: "5.2L/100km",
      luggage: "391L"
    }
  },
  {
    _id: "3",
    name: "BMW Série 3",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80"
    ],
    price: "120",
    features: ["5 Sièges", "Climatisation", "Automatique", "Essence", "Bluetooth", "USB", "GPS", "Toit ouvrant"],
    description: "La BMW Série 3 combine style et performance, parfaite pour tous vos déplacements en Tunisie. Une expérience de conduite premium.",
    rating: 4.9,
    specs: {
      transmission: "Automatique",
      fuel: "Essence",
      power: "184 ch",
      seats: 5,
      consumption: "6.5L/100km",
      luggage: "480L"
    }
  }
];