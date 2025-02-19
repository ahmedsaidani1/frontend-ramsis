import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (form.current) {
      emailjs
        .sendForm(
          'service_srliagu', // Replace with your EmailJS service ID
          'template_2s90nai', // Replace with your EmailJS template ID
          form.current,
          'xkDpyw5oN2Fxj_Ace' // Replace with your EmailJS public key
        )
        .then(
          () => {
            setIsSuccess(true);
            if (form.current) form.current.reset();
          },
          (error) => {
            setError('Une erreur est survenue. Veuillez réessayer plus tard.');
            console.error(error);
          }
        )
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
  <Layout>
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a href="tel:+216 53552328" className="text-gray-600 hover:text-red-600">
                      +216 53 552 328
                    </a>
                    <br />
                    <a href="tel:+21652706788" className="text-gray-600 hover:text-red-600">
                      +216 20 190 776
                    </a>
                    <br />
                    <a href="tel:+21650556009" className="text-gray-600 hover:text-red-600">
                      +216 50 556 009
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@carrental.tn" className="text-gray-600 hover:text-red-600">
                      ramsisrentacar@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">
                      Chotrana , Tunisie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi:</span>
                  <span className="font-medium">08:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Samedi:</span>
                  <span className="font-medium">09:00 - 16:00</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Dimanche:</span>
                  <span className="font-medium">Fermé</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message envoyé!</h3>
                <p className="text-gray-600">
                  Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  ></textarea>
                </div>
                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Envoi en cours...</span>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
}