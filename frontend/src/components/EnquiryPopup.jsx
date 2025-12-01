import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import UserAxiosAPI from '../api/userAxiosAPI';

const EnquiryPopup = ({ number }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    fullNumber: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const axios = UserAxiosAPI();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.number.trim()) {
      newErrors.number = 'Number is required';
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = 'Number must be exactly 10 digits';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent number input from exceeding 10 digits
    if (name === 'number' && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
        toast.error('Please fill all fields correctly');
        return;
    }
    setLoading(true);

    try {
      const res = await axios.post('/enquiry', {
        ...formData,
        fullNumber: number?.number,
        VIPNumber: number?._id,
      });

      toast.success('Enquiry sent successfully! Will reach out to you soon!');
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        number: '',
        subject: '',
        fullNumber: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error('Failed to send enquiry. Please try again.');
    } finally{
        setLoading(false);
    }
  };

  return (
    <>
     <button
        onClick={() => setShowForm(true)}
        className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-all text-lg w-full"
      >
        <FaEnvelope /> Enquiry Now
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
          <form
            onSubmit={handleSubmit}
            className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-xl space-y-4"
          >
            <h2 className="text-xl font-semibold text-center">
              Enquire For : {number?.number}
            </h2>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="number"
                placeholder="Your Number"
                value={formData.number}
                onChange={handleChange}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg"
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-500 px-4 py-2 rounded-lg h-24"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 ${loading?"cursor-not-allowed":'cursor-pointer'}`}
              >
                {loading?"Sending...":"Send Message"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EnquiryPopup;
