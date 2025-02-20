import { Users, Shield, Clock, Award, CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';
import cars from '../assets/carsimg.webp'

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80" 
            alt="Car rental team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">À Propos de Ramsis Rent a Car</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Votre partenaire de confiance pour la location de voitures en Tunisie.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
              <p className="text-gray-600 mb-8">
                Chez <span className='text-red-600 '> Ramsis Rent a Car</span>, notre mission est de fournir une expérience de location de voiture exceptionnelle à nos clients. Nous nous engageons à offrir des véhicules de qualité, un service personnalisé et des tarifs compétitifs pour répondre à tous vos besoins de mobilité en Tunisie.
              </p>
              <div className="space-y-4">
                {[
                  "Service client disponible 24/7",
                  "Véhicules récents et bien entretenus",
                  "Prix transparents sans frais cachés",
                 
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={cars}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-lg">
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2000+", label: "Clients Satisfaits", icon: Users },
              { number: "100%", label: "Sécurité", icon: Shield },
              { number: "24/7", label: "Support Client", icon: Clock },
              { number: "50+", label: "Véhicules", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Nos Valeurs</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Des principes qui guident chacune de nos actions pour vous offrir le meilleur service possible
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Qualité", description: "Nous maintenons une flotte de véhicules récents et parfaitement entretenus pour votre sécurité et votre confort." },
        { title: "Transparence", description: "Pas de frais cachés, des tarifs clairs et une communication honnête avec nos clients." },
        { title: "Excellence", description: "Un service client irréprochable et une attention particulière portée à chaque détail." }
      ].map((value, index) => (
        <div 
          key={index} 
          className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{value.title}</h3>
          <p className="text-gray-700 text-center">{value.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Team Section */}
         </Layout>
  );
}