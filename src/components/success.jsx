export const successComponent = ({ success }) => {
    if (!success) return null;
  
    return (
      <div className="bg-green-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">success:</strong>
        <span className="block sm:inline">{success}</span>
      </div>
    );
  };