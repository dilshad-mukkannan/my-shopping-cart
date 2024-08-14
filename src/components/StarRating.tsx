// import React from 'react';

// interface StarRatingProps {
//   rate: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rate }) => {
//   const fullStars = Math.round(rate);
//   const stars = [];

//   for (let i = 0; i < 5; i++) {
//     stars.push(
//       <svg
//         key={i}
//         className={`w-4 h-4 ${i < fullStars ? 'text-yellow-500' : 'text-gray-300'}`}
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path d="M10 15l-5.878 3.09L5 12.272.121 8.91 6.309 8l1.908-5.89L10 3.727 11.783 2.11 13.69 8l6.19.909L15 12.273l.878 5.816L10 15z" />
//       </svg>
//     );
//   }

//   return <div className="flex">{stars}</div>;
// };

// export default StarRating;


import React from 'react';

interface StarRatingProps {
  rate: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rate }) => {
  const fullStars = Math.round(rate);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < fullStars ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09L5 12.272.121 8.91 6.309 8l1.908-5.89L10 3.727 11.783 2.11 13.69 8l6.19.909L15 12.273l.878 5.816L10 15z" />
      </svg>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
