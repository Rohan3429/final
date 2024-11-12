// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div>
//       <header>
//         <h1>Welcome to Our Platform</h1>
//         <nav>
//           <ul>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <section>
//           <h2>About Us</h2>
//           <p>Our platform provides a seamless experience for students, professors, and proctors.</p>
//         </section>
//         <section>
//           <h2>Features</h2>
//           <ul>
//             <li>Student Portal</li>
//             <li>Professor Portal</li>
//             <li>Proctor Portal</li>
//           </ul>
//         </section>
//       </main>
//       <footer>
//         <p>&copy; 2023 Our Platform. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Home;

import React,{useState} from 'react';
import { Link } from 'react-router-dom';
// import { BookOpen, Users, Award, Brain, Clock, Shield } from 'lucide-react';
import { 
  BookOpen, Users, Award, Brain, Clock, Shield, 
  ChevronDown, Star, CheckCircle, PlayCircle
} from 'lucide-react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EduLearn</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
            Learning Made <span className="text-blue-600">Fun</span> and <span className="text-blue-600">Easy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our friendly learning community where students, teachers, and mentors come together to make education exciting!
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform hover:scale-105">
              Start Learning Now
            </Link>
            <Link to="/about" className="px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose EduLearn?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Interactive Learning",
                description: "Learn together with friends and get help from friendly teachers!"
              },
              {
                icon: <Brain className="h-8 w-8 text-blue-600" />,
                title: "Smart Progress Tracking",
                description: "Watch your knowledge grow with fun progress charts and rewards!"
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Learn at Your Pace",
                description: "Take your time or zoom ahead - you choose how fast to learn!"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Something for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Students",
                icon: <Award className="h-12 w-12 text-blue-600" />,
                description: "Discover exciting lessons, take fun quizzes, and earn cool badges!"
              },
              {
                title: "Teachers",
                icon: <Users className="h-12 w-12 text-blue-600" />,
                description: "Create engaging content and watch your students grow!"
              },
              {
                title: "Proctors",
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                description: "Ensure fair assessments in a secure environment."
              }
            ].map((role, index) => (
              <div key={index} className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition-colors">
                <div className="flex flex-col items-center text-center">
                  {role.icon}
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{role.title}</h3>
                  <p className="mt-2 text-gray-600">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Statistics Section */}
       <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Happy Students" },
              { number: "1,000+", label: "Expert Teachers" },
              { number: "5,000+", label: "Courses" },
              { number: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Student",
                image: "/api/placeholder/64/64",
                quote: "Learning has never been this fun! I love earning badges and competing with my friends.",
                rating: 5
              },
              {
                name: "Prof. Michael Chen",
                role: "Teacher",
                image: "/api/placeholder/64/64",
                quote: "The teaching tools are fantastic. I can easily track my students' progress and provide timely feedback.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Parent",
                image: "/api/placeholder/64/64",
                quote: "My children's grades have improved significantly since using this platform. It's worth every penny!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    // alt={testimonial.name}
                    alt={"image"} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 mt-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Sign Up",
                description: "Create your account in minutes" 
              },
              { 
                icon: <BookOpen className="h-8 w-8 text-blue-600" />,
                title: "Choose Courses",
                description: "Browse our extensive course catalog" 
              },
              { 
                icon: <PlayCircle className="h-8 w-8 text-blue-600" />,
                title: "Start Learning",
                description: "Learn at your own pace" 
              },
              { 
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: "Earn Certificates",
                description: "Get recognized for your achievements" 
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-blue-200" />
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: "How much does it cost?",
                answer: "We offer flexible pricing plans starting from free tier for basic features. Premium plans start at $9.99/month with additional features."
              },
              {
                question: "Can I try it for free?",
                answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required."
              },
              {
                question: "Is there a mobile app?",
                answer: "Yes, our platform is available on both iOS and Android devices. You can learn anywhere, anytime!"
              },
              {
                question: "How do I get started?",
                answer: "Simply click the 'Get Started' button, create your account, and you'll be learning in minutes!"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Start Learning?
              </h2>
              <p className="text-blue-100">
                Join thousands of happy students today!
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/register" 
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Get Started Free
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-blue-600">Our Story</Link></li>
                <li><Link to="/team" className="text-gray-600 hover:text-blue-600">Team</Link></li>
                <li><Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
                <li><Link to="/guides" className="text-gray-600 hover:text-blue-600">Guides</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms</Link></li>
                <li><Link to="/security" className="text-gray-600 hover:text-blue-600">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} EduLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;