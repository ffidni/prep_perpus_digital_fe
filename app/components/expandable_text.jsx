'use client';

import React, { useState } from 'react';

export default function ExpandableText({ children, maxLength }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const text = children;
  const displayText = expanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <p className="text-sm text-white">{displayText}</p>
      {text.length > maxLength && (
        <p
          onClick={toggleExpansion}
          className="text-white font-semibold underline cursor-pointer focus:outline-none text-center"
        >
          {expanded ? 'See less' : 'See more'}
        </p>
      )}
    </div>
  );
}
