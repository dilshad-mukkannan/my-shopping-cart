// import React from 'react';

// interface TheSidebarProps {
//   selectedCategory: string;
//   onSelectCategory: (category: string) => void;
//   categories: { value: string; label: string }[];
// }

// const TheSidebar: React.FC<TheSidebarProps> = ({ selectedCategory, onSelectCategory, categories }) => {
//   return (
//     <div className="sidebar bg-gray-100 p-4 w-64">
//       <ul className="list-none">
//         {categories.map((category, index) => (
//           <li key={index} className="mb-2">
//             <button
//               onClick={() => onSelectCategory(category.value)}
//               className={`block w-full text-left p-2 rounded ${selectedCategory === category.value ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
//             >
//               {category.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TheSidebar;

// src/components/TheSidebar.tsx
import React from 'react';

interface TheSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: { value: string; label: string }[];
}

const TheSidebar: React.FC<TheSidebarProps> = ({ selectedCategory, onSelectCategory, categories }) => {
  return (
    <div className="sidebar p-4">
      <h2 className="font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.value} className="mb-2">
            <button
              className={`p-2 ${selectedCategory === category.value ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded`}
              onClick={() => onSelectCategory(category.value)}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheSidebar;
