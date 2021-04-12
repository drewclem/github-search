import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import SearchResultsList from '../components/search/SearchResultsList';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    const pages = Math.ceil(totalCount / 25);

    // Unauthenticated github requests only return the first 1000 results. This limits the pagination to match those 1000 returned items
    if (pages > 40) {
      setNumberOfPages(40);
    } else {
      setNumberOfPages(pages);
    }
  }, [totalCount]);

  useEffect(() => {
    if (searchTerm !== null) {
      setSearchResults(searchResults);
    }
  }, [searchResults, searchTerm]);

  async function initialSearchRequest(e) {
    e.preventDefault();

    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=25&page=1`,
      {
        headers: { Authorization: `token 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` },
      }
    );

    const rawResults = await response?.json();

    const individualUserResponses = await Promise.all(
      rawResults.items.map(({ url }) => fetch(url))
    );

    const individualUserInfo = await Promise.all(
      individualUserResponses.map((userResponse) => userResponse.json())
    );

    const users = rawResults.items.map((user, index) => {
      const fullUserInfo = {
        ...user,
        ...individualUserInfo[index],
      };

      return fullUserInfo;
    });

    setSearchResults(users);

    setCurrentPage(1);
    setTotalCount(rawResults.total_count);
  }

  function clearSearch() {
    setSearchTerm('');
    setSearchResults([]);
  }

  const handlePageClick = async (page) => {
    setCurrentPage(page);

    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=25&page=${page}`,
      {
        headers: { Authorization: `token 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` },
      }
    );

    const rawResults = await response.json();

    const individualUserResponses = await Promise.all(
      rawResults.items.map(({ url }) => fetch(url))
    );

    const individualUserInfo = await Promise.all(
      individualUserResponses.map((userResponse) => userResponse.json())
    );

    const users = rawResults.items.map((user, index) => {
      const fullUserInfo = {
        ...user,
        ...individualUserInfo[index],
      };

      return fullUserInfo;
    });

    console.log({ users });

    setSearchResults(users);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form className="mb-12" onSubmit={initialSearchRequest}>
        <div className="flex justify-between items-start">
          <label htmlFor="searchInput">
            <h1 className="text-2xl">Github User Search</h1>
          </label>

          <button
            className="opacity-50 hover:opacity-100 focus:opacity-100 bg-gray-200 hover:bg-gray-300 py-1 px-2 transition duration-150 ease-in-out"
            type="button"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>

        <div className="relative">
          <input
            id="searchInput"
            className="border border-gray-400 p-3 w-full rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />

          <button
            className="absolute right-0 opacity-50 hover:opacity-100 focus:opacity-100 p-2 mt-2 mr-2 rounded-full transform transition duration-150 ease-in-out bg-tdl-blue text-tdl-red"
            type="submit"
          >
            <span className="sr-only">Submit Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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

          {searchResults?.length ? (
            <div className="flex justify-between mt-4 opacity-50">
              <p>{totalCount} results</p>
              <p>Page {currentPage}</p>
            </div>
          ) : null}
        </div>
      </form>

      <div>
        <SearchResultsList results={searchResults} totalCount={totalCount} />

        {searchResults?.length && numberOfPages > 1 ? (
          <ReactPaginate
            pageCount={numberOfPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            containerClassName={'pagination'}
            onPageChange={(e) => handlePageClick(e.selected + 1)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
