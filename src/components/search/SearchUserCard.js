import React from 'react';

const SearchUserCard = ({ user }) => {
  return (
    <li className="mb-12">
      <a className="flex bg-white shadow hover:shadow-md p-4 rounded-lg" href={user.html_url}>
        <div className="h-24 w-24 rounded-full overflow-hidden">
          <img src={user.avatar_url} alt={user.login} />
        </div>

        <div className="ml-6 flex justify-between items-center flex-grow">
          <div>
            <p className="text-xl font-bold mb-2">{user.login}</p>
            <p>
              {user.followers} <span className="opacity-50">followers</span>
            </p>
            <p>{user.starred_url.length}</p>
          </div>

          <div className="text-tdl-red">
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
};

export default SearchUserCard;
