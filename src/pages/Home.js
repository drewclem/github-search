import React, { useState } from 'react';
import SearchUserCard from '../components/search/SearchUserCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState();

  async function handleSearchRequest(e) {
    e.preventDefault();

    const api = `https://api.github.com/search/users?q=${searchTerm}&per_page=25`;

    const response = await fetch(api);

    const rawResults = await response.json();

    setSearchResults(rawResults.items);
    setTotalCount(rawResults.total_count);
  }

  function clearSearch() {
    setSearchTerm('');
    setSearchResults([]);
  }

  return (
    <div className="max-w-xl mx-auto">
      <form className="mb-12" onSubmit={handleSearchRequest}>
        <label htmlFor="searchInput">
          <h1 className="text-2xl">A Github Search Tool</h1>
        </label>

        <div className="relative">
          <input
            id="searchInput"
            className="border border-gray-400 p-3 w-full rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          {!searchResults?.length ? (
            <button
              className="absolute right-0 opacity-50 hover:opacity-100 focus:opacity-100 p-2 mt-1 mr-1 rounded-full transform transition duration-150 ease-in-out bg-tdl-blue text-tdl-red"
              type="submit"
            >
              <span className="sr-only">Submit Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="absolute right-0 opacity-50 hover:opacity-100 focus:opacity-100 p-2 mt-1 mr-1 rounded-full transform transition duration-150 ease-in-out bg-tdl-blue text-tdl-red"
              type="button"
              onClick={clearSearch}
            >
              <span className="sr-only">Clear Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {searchResults?.length ? (
            <div className="mt-4 opacity-50">{totalCount} results</div>
          ) : null}
        </div>
      </form>

      <div>
        {searchResults?.length ? (
          <ul>
            {searchResults.map((user) => {
              return <SearchUserCard user={user} />;
            })}
          </ul>
        ) : (
          <div>Your results will show here.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
