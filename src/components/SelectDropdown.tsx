// import React from 'react';

// interface SelectDropdownProps {
//   value: string;
//   onChange: (value: string) => void;
//   options: { value: string; label: string }[];
//   placeholder: string;
// }

// const SelectDropdown: React.FC<SelectDropdownProps> = ({ value, onChange, options, placeholder }) => {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="border p-2 rounded bg-gray-100 shadow-md"
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option, index) => (
//         <option key={index} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default SelectDropdown;


import React from 'react';

interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded bg-gray-100 shadow-md"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
