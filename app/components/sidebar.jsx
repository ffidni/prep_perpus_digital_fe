/* eslint-disable @next/next/no-img-element */
'use client';

import { faBook, faBoxes, faCompass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Sidebar({ menus }) {
  const currPath = usePathname();

  return (
    <div className="hidden sm:flex flex-col gap-10 px-8 py-5 border-2 w-2/11">
      <div className="p-2 flex items-center gap-3">
        <img src="/images/logo.png" alt="" className="w-10" />
        <p className="text-md font-bold text-center">e-Maca V1.0</p>
      </div>
      <div className="flex flex-col gap-3 ">
        {menus.map(({ icon, title, onClick, path }) => {
          return (
            <div
              key={title}
              className={`flex items-center gap-3 hover:bg-gray-100 ${
                path == currPath ? 'bg-gray-100' : ''
              } btn px-5 py-3 w-48 rounded-lg`}
              onClick={onClick}
            >
              <FontAwesomeIcon icon={icon} />
              <p className="font-semibold text-md">{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
