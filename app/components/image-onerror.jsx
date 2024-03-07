/* eslint-disable @next/next/no-img-element */
'use client';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

export function QuoteAuthorImage({ src, className, width, height }) {
  const ref = useRef();
  const [imgDefault, setImgDefault] = useState(null);

  return imgDefault == null ? (
    <img
      ref={ref}
      alt=""
      src={src}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgDefault(true);
      }}
    />
  ) : (
    <div
      className={className + ' flex justify-center items-center'}
      style={{ width: width, height: height }}
    >
      <FontAwesomeIcon icon={faUser} className="w-10" />
    </div>
  );
}

export function ImageOnError({ src, alt, className, altImage }) {
  const ref = useRef();

  return (
    <img
      ref={ref}
      alt={alt}
      src={src}
      className={className}
      onError={() => {
        if (altImage) {
          ref.current.src = altImage;
        }
      }}
    />
  );
}
