import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
  addClass?: string;
}

export const Button: React.FC<Props> = ({
  label,
  onClick,
  addClass = '',
}) => {
  return (
    <button
      className={`text-white font-bold p-4 px-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 ${addClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

