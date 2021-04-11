import React from 'react';
import SearchUserCard from './SearchUserCard';

const SearchResultsList = ({ results, totalCount }) => {
  return (
    <>
      {results?.length ? (
        <>
          <ul className="mb-20">
            {results.map((user) => {
              return <SearchUserCard user={user} />;
            })}
          </ul>
        </>
      ) : (
        <div>Your results will show here.</div>
      )}
    </>
  );
};

export default SearchResultsList;
