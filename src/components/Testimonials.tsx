import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Wanjiru",
      location: "Nairobi",
      rating: 5,
      text: "SwiftLoan helped me expand my business when I needed it most. The application process was straightforward and I received my funds within 2 business days.",
      loanAmount: "KES 75,000",
      date: "October 2024",
      verified: true
    },
    {
      id: 2,
      name: "James Ochieng",
      location: "Kisumu",
      rating: 5,
      text: "I was able to pay for my daughter's school fees on time thanks to SwiftLoan. The interest rates were fair and the repayment terms were flexible.",
      loanAmount: "KES 30,000",
      date: "September 2024",
      verified: true
    },
    {
      id: 3,
      name: "Mary Kamau",
      location: "Mombasa",
      rating: 4,
      text: "Quick and reliable service. The customer support team was helpful throughout the process. I appreciated the transparency in fees and terms.",
      loanAmount: "KES 50,000",
      date: "September 2024",
      verified: true
    },
    {
      id: 4,
      name: "Peter Mutua",
      location: "Nakuru",
      rating: 5,
      text: "As a small business owner, getting credit has always been challenging. SwiftLoan made it possible for me to purchase inventory for my shop.",
      loanAmount: "KES 100,000",
      date: "August 2024",
      verified: true
    },
    {
      id: 5,
      name: "Grace Njeri",
      location: "Eldoret",
      rating: 5,
      text: "The digital application saved me so much time. No need to visit a physical branch. Everything was done from my phone. Highly recommended!",
      loanAmount: "KES 40,000",
      date: "August 2024",
      verified: true
    },
    {
      id: 6,
      name: "John Kiprop",
      location: "Thika",
      rating: 4,
      text: "Good service with reasonable rates. The M-PESA disbursement was convenient. Would use again for future financial needs.",
      loanAmount: "KES 25,000",
      date: "July 2024",
      verified: true
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from real customers across Kenya
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">4.8/5 Average Rating</span>
            <span className="text-gray-500">({testimonials.length}00+ reviews)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start mb-4">
                <Quote className="w-8 h-8 text-green-500 opacity-50" />
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Loan: {testimonial.loanAmount}</span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Join Thousands of Satisfied Customers
          </h3>
          <p className="mb-6 text-green-100">
            Experience fast, reliable, and transparent lending services
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24hrs</div>
              <div className="text-green-100">Average Approval</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.8/5</div>
              <div className="text-green-100">Customer Rating</div>
            </div>
          </div>
          <p className="text-xs text-green-200">
            *All testimonials are from verified customers. Loan approval subject to eligibility criteria.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> Individual results may vary. All loans are subject to approval based on our 
            credit assessment criteria. Past customer experiences do not guarantee future loan approval or similar terms. 
            Representative APR ranges from 10% to 35% based on individual creditworthiness.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
