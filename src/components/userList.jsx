import React, { useEffect, useState } from 'react';
import { ProfileCard } from './profilecard';
import useUserStore from '../store/userStore';
import LoadingSpinner from './loadingSpinner';

const UserList = () => {
  const { userList, fetchUserList, loading, error } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const totalPages = Math.ceil(userList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageItems = userList.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentPageItems.map(user => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              className={`px-4 py-2 mx-1 ${
                currentPage === pageIndex ? 'bg-yellow-700' : 'bg-yellow-500'
              } text-white rounded hover:bg-yellow-700 transition duration-300`}
            >
              {pageIndex}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
