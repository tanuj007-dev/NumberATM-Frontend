import React, { useEffect, useState } from 'react';
import axiosAPI from '../../api/axiosAPI';
const XLSX = await import("xlsx");
import { useAlert } from '../../context/AlertContext';

const ContactList = () => {
  const { showConfirm, showAlert } = useAlert();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const axios = axiosAPI();

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async (message) => {
    await showAlert({
      title: 'Message Details',
      message: message,
    });
  };

  const deleteContact = async (id) => {
    const confirmed = await showConfirm({
      title: 'Are you sure?',
      message: 'This enquiry will be permanently deleted!',
    });

    if (!confirmed) return;

    try {
      await axios.delete(`/contact/${id}`);
      await showAlert({
        title: 'Deleted!',
        message: 'The contact query has been deleted.',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact query:', error);
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
      console.error('No data available to export.');
      return;
    }

    const formattedData = data.map((row) => {
      const {
        name,
        email,
        contact,
        subject,
        message,
        createdAt,
      } = row;

      return {
        name,
        email,
        contact: contact || 'N/A',
        subject,
        message,
        createdAt: new Date(createdAt).toLocaleString('en-US', {
          day: '2-digit',
          year: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    });

    const columns = ['name', 'email', 'contact', 'subject', 'message', 'createdAt'];
    const ws = XLSX.utils.json_to_sheet(formattedData, { header: columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Queries');
    XLSX.writeFile(wb, 'contact_queries.xlsx');
  };

  const filteredContacts = contacts
    .filter((contact) =>
      contact.status?.includes(filter) &&
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
      }
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen shadow-lg">
      <h1 className="text-lg md:text-3xl text-center font-bold mb-4">Contact Queries</h1>

      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-2 bg-white"
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
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 bg-white"
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
          <table className="min-w-full bg-white rounded-lg text-sm shadow-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 border-black border text-left">Name</th>
                <th className="py-2 px-4 border-black border text-left">Email</th>
                <th className="py-2 px-4 border-black border text-left">Phone</th>
                <th className="py-2 px-4 border-black border text-left">Subject</th>
                <th className="py-2 px-4 border-black border text-left">Message</th>
                <th className="py-2 px-4 border-black border text-center">Date</th>
                <th className="py-2 px-4 border-black border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts?.length === 0 ? (
                <tr><td colSpan="7" className='text-center py-5'>No Query!</td></tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b">
                    <td className="py-2 border-black text-nowrap border px-4">{contact.name}</td>
                    <td className="py-2 border-black text-nowrap border px-4">{contact.email}</td>
                    <td className="py-2 border-black text-nowrap border px-4">{contact.contact || "N/A"}</td>
                    <td className="py-2 border-black border px-4">{contact.subject}</td>
                    <td className="py-2 border-black border px-4">
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
                    <td className="py-2 px-4 border-black border text-center">
                      {new Date(contact.createdAt).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-2 px-4 border-black border text-center">
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

export default ContactList;
