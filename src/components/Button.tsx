
// import React from 'react';

// interface ButtonProps {
//   text: string;
//   onClick?: () => void;
//   className?: string;
//   icon?: React.ReactNode;
//   iconPosition?: 'left' | 'right'; // Allow specifying icon position
//   component?: React.ElementType;
//   to?: string;
// }

// const Button: React.FC<ButtonProps> = ({
//   text,
//   onClick,
//   className,
//   icon,
//   iconPosition = 'left', // Default icon position to 'left'
//   component: Component,
//   to
// }) => {
//   const BaseComponent = Component || 'button';

//   return (
//     <BaseComponent
//       onClick={onClick}
//       className={`px-4 py-2 rounded flex items-center ${className}`}
//       to={to}
//     >
//       {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
//       {text}
//       {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
//     </BaseComponent>
//   );
// };

// export default Button;


import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // Allow specifying icon position
  component?: React.ElementType;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  icon,
  iconPosition = 'left', // Default icon position to 'left'
  component: Component,
  to
}) => {
  const BaseComponent = Component || 'button';

  return (
    <BaseComponent
      onClick={onClick}
      className={`px-4 py-2 rounded flex items-center ${className}`}
      to={to}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </BaseComponent>
  );
};

export default Button;