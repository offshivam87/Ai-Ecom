import { motion } from "framer-motion";
import { Mail, Phone, Package, Truck, CheckCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen mt-10 px-6 py-16 max-w-7xl mx-auto">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Hi, I'm <span className="text-orange-500">Shivam</span> 👋
          </h1>
          <p className="text-gray-600 mt-4 leading-relaxed">
            I'm a passionate <b>MERN Stack Developer</b> who loves building
            modern, scalable and user-friendly applications.
            This project is built with real-world practices inspired by
            Amazon & Flipkart.
          </p>

          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-orange-500" />
              <a href="mailto:codewithtrapnog@gmail.com"><span>codewithtrapnog@gmail.com</span></a>
            </div>
           <a href="tel:8853106016"> <div className="flex items-center gap-3">
              <Phone className="text-orange-500" />
              <span>+91 8853106016</span>
            </div></a>
          </div>
        </div>

        {/* Right - Image */}
        <div className="flex justify-center">
          <img
            src="https://ik.imagekit.io/vzualvibemedia/products/IMG_4700.JPG"
            alt="Developer Shivam"
            className="w-72 h-72 object-cover object-bottom rounded-full border-4 border-orange-500 shadow-lg"
          />
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          🛠 Tech Stack Used
        </h2>

        <div className="flex flex-wrap gap-4">
          {[
            "React.js",
            "Tailwind CSS",
            "Framer Motion",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT Auth",
            "Lucide Icons",
            "Node Mailer"
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* How Project Built */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          ⚙️ How This Project Was Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="border p-6 rounded-xl">
            <Package className="text-orange-500 mb-3" size={32} />
            <h3 className="font-semibold text-lg">Product System</h3>
            <p className="text-gray-600 text-sm mt-2">
              Products fetched from backend API with skeleton loading
              and responsive product cards.
            </p>
          </div>

          <div className="border p-6 rounded-xl">
            <Truck className="text-orange-500 mb-3" size={32} />
            <h3 className="font-semibold text-lg">E-commerce Flow</h3>
            <p className="text-gray-600 text-sm mt-2">
              Cart, checkout, banners, sliders and real-world UI patterns
              inspired by top platforms.
            </p>
          </div>

          <div className="border p-6 rounded-xl">
            <CheckCircle className="text-orange-500 mb-3" size={32} />
            <h3 className="font-semibold text-lg">Clean UX</h3>
            <p className="text-gray-600 text-sm mt-2">
              Smooth animations, skeleton loaders, and scalable
              component-based architecture.
            </p>
          </div>

        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Want to work with me?
        </h2>
        <p className="text-gray-600 mt-3">
          I'm open for internships, freelance & full-time opportunities.
        </p>
        <a href="tel:+918853106016"><button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
          Contact Me
        </button></a>
      </motion.div>

    </div>
  );
};

export default Contact;
