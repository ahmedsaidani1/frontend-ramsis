import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Menu, X, Phone, Mail, MapPinned, Facebook, Instagram } from 'lucide-react';
import logo from '../assets/logo.png'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} className=" w-32 h-24"alt="logo remsis rent car" />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors">ACCUEIL</Link>
              <Link to="/cars" className="text-gray-600 hover:text-red-600 transition-colors">NOS VOITURES</Link>
              <Link to="/about" className="text-gray-600 hover:text-red-600 transition-colors">À PROPOS</Link>
              <Link to="/contact" className="text-gray-600 hover:text-red-600 transition-colors">CONTACT</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+21620190776" className="text-gray-400 hover:text-red-600 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:ramsisrentacar@gmail.com" className="text-gray-400 hover:text-red-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 md:p-6 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center space-x-2">
              <img src={logo} className=" w-28 h-24"alt="logo remsis rent car" />
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <Link 
                to="/" 
                className="block text-gray-600 hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ACCUEIL
              </Link>
              <Link 
                to="/cars" 
                className="block text-gray-600 hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NOS VOITURES
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-600 hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                À PROPOS
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-600 hover:text-red-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>

              <div className="pt-4 border-t">
                <div className="space-y-3">
                  <a 
                    href="tel:+21620190776" 
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors py-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+216 20 190 776</span>
                  </a>
                  <a 
                    href="tel:+21653552328" 
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors py-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+216 53 552 328</span>
                  </a>
                  <a 
                    href="tel:+21650556009" 
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors py-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+216 50 556 009</span>
                  </a>
                  <a 
                    href="mailto:ramsisrentacar@gmail.com" 
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors py-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>ramsisrentacar@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Nos Agences</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600 py-2">
                    <MapPinned className="w-4 h-4 flex-shrink-0" />
                    <span>Tunis Carthage</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 py-2">
                    <MapPinned className="w-4 h-4 flex-shrink-0" />
                    <span>Manzah 6</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 py-2">
                    <MapPinned className="w-4 h-4 flex-shrink-0" />
                    <span>Chotrana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg md:text-xl font-bold">Ramsis Rent a Car</span>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Location de voitures en Tunisie aux meilleurs prix.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61573046490284" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/cars" className="hover:text-white transition-colors">Nos Voitures</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Agences</h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPinned className="w-4 h-4" />
                <span>Tunis Carthage</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPinned className="w-4 h-4" />
                <span>Manzah 6</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPinned className="w-4 h-4" />
                <span>Chotrana</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm md:text-base text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+216 20 190 776</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+216 53 552 328</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+216 50 556 009</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>ramsisrentacar@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Remsis Rent A car. Tous droits réservés.
            <br />
            developed by <a href='https://www.facebook.com/profile.php?id=100011509725033' target="_blank" className='hover:text-white transition-colors hover:underline'>Ahmed Saidani</a>
          </p>
        </div>
      </footer>
    </div>
  );
}