'use client';

import { QuoteAuthorImage } from '@/app/components/image-onerror';
import Sidebar from '@/app/components/sidebar';
import { ApiService } from '@/app/network/services';
import Helper from '@/app/utils/helper';
import {
  faBook,
  faBoxes,
  faCompass,
  faHand,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function MainLayout({ children }) {
  const currPath = usePathname();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    ApiService.getItem({ table: 'me' }).then((data) => setAccount(data.data));
  }, []);

  useEffect(() => {
    console.log('WAGWAN', account);
  }, [account]);

  const headersName = {
    '/explore': 'Jelajah',
    '/buku': 'Buku',
    '/peminjaman': 'Peminjaman',
    '/kategori': 'Kategori',
  };

  const menus = [
    {
      icon: faCompass,
      title: 'Jelajah',
      onClick: () => {},
      path: '/explore',
    },
    {
      icon: faBook,
      title: 'Buku',
      onClick: () => {},
      path: '/buku',
    },
    {
      icon: faHand,
      title: 'Peminjaman',
      onClick: () => {},
      path: '/peminjaman',
    },
    {
      icon: faBoxes,
      title: 'Kategori',
      onClick: () => {},
      path: '/kategori',
    },
  ];

  console.log('AKUN', account);

  // const selectedMenu = menus[path] == currPath

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar menus={menus} />
        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
          <div className="flex items-center  justify-between px-5 py-2">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCompass} className="text-2xl" />
              <p className="font-semibold text-2xl py-2">
                {headersName[currPath]}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <QuoteAuthorImage
                key={account?.avatar ?? ''}
                src={Helper.createAssetsLink(account?.avatar ?? '')}
                className={
                  'object-cover w-10 h-10 rounded-full border-2 bg-white flex-shrink-0'
                }
              />
              <p>{account?.username ?? ''}</p>
            </div>
          </div>
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
