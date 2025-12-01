import React, { useEffect, useState } from 'react';
import { useAlert } from '../../context/AlertContext';
import axiosAPI from '../../api/axiosAPI';
const XLSX = await import("xlsx");

const EnquiryList = () => {
  const { showAlert, showConfirm } = useAlert();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const axios = axiosAPI();

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/enquiry');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async (message) => {
    await showAlert({
      title: 'Message Details',
      message,
    });
  };

  const deleteContact = async (id) => {
    const confirmed = await showConfirm({
      title: 'Are you sure?',
      message: 'This enquiry will be permanently deleted!',
      confirmText: 'Yes, Delete',
    });

    if (!confirmed) return;

    try {
      await axios.delete(`/enquiry/${id}`);
      await showAlert({
        title: 'Deleted!',
        message: 'The enquiry has been deleted.',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      await showAlert({
        title: 'Error',
        message: 'Something went wrong while deleting.',
      });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      console.error("No data available to export.");
      return;
    }

    const formattedData = data.map((row) => ({
      name: row.name,
      vip_number: row.VIPNumber?.number || "Deleted Number",
      email: row.email,
      contact: row.number || "N/A",
      subject: row.subject,
      message: row.message,
      createdAt: new Date(row.createdAt).toLocaleString('en-US', {
        day: '2-digit',
        year: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Number Enquiries");
    XLSX.writeFile(wb, "numbers_enquiries.xlsx");
  };

  const filteredContacts = contacts
    ?.filter((contact) =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a[sortBy]?.toLowerCase() > b[sortBy]?.toLowerCase() ? 1 : -1;
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen shadow-lg">
      <h1 className="text-lg md:text-3xl text-center font-bold mb-4">Contact Queries</h1>

      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search by Name, Email, Subject or Message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 bg-green-500 text-white"
          onClick={() => exportToExcel(filteredContacts)}
        >
          Export to Excel
        </button>
        <select
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="subject">Sort by Subject</option>
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full overflow-auto bg-white rounded-lg text-sm shadow-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 border border-black px-4 text-left">VIP Number</th>
                <th className="py-2 border border-black px-4 text-left">Name</th>
                <th className="py-2 border border-black px-4 text-left">Number</th>
                <th className="py-2 border border-black px-4 text-left">Email</th>
                <th className="py-2 border border-black px-4 text-left">Subject</th>
                <th className="py-2 border border-black px-4 text-left">Message</th>
                <th className="py-2 border border-black px-4 text-center">Date</th>
                <th className="py-2 border border-black px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts?.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    No Query!
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b">
                    <td className="py-2 border text-nowrap border-black font-bold px-4">
                      {contact.fullNumber}
                    </td>
                    <td className="py-2 border text-nowrap border-black px-4">{contact.name}</td>
                    <td className="py-2 border text-nowrap border-black px-4">+91-{contact.number}</td>
                    <td className="py-2 border border-black px-4">{contact.email}</td>
                    <td className="py-2 border border-black px-4">{contact.subject}</td>
                    <td className="py-2 border border-black px-4">
                      {contact.message.length > 100 ? (
                        <>
                          <span>{contact.message.slice(0, 35)}...</span>{' '}
                          <button
                            onClick={() => handleViewMessage(contact.message)}
                            className="text-blue-500 underline hover:text-blue-600"
                          >
                            Read More
                          </button>
                        </>
                      ) : (
                        <span>{contact.message}</span>
                      )}
                    </td>
                    <td className="py-2 border border-black px-4 text-center">
                      {new Date(contact.createdAt).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2 border border-black px-4 text-center">
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EnquiryList;
