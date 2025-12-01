
const OutOfStockAlert = ({ message, outOfStockNumbers }) => {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">❗ Some numbers were just sold out</h2>
      <p className="mb-2">{message}</p>
      <ul className="list-disc list-inside">
        {outOfStockNumbers.map((num, idx) => (
          <li key={idx}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

export default OutOfStockAlert;
