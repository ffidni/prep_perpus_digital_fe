/* eslint-disable @next/next/no-img-element */
import Helper from '@/app/utils/helper';
import React from 'react';

function KategoriCard({ nama_kategori, cover, kategori_id }) {
  return (
    <div className="flex justify-center items-center border-2 bg-white gap-3 w-40 p-2 rounded-lg flex-shrink-0">
      <img
        src={Helper.createAssetsLink(cover)}
        alt=""
        className="w-14 h-14 flex-shrink-0"
      />
      <p className="text-sm font-semibold">{nama_kategori}</p>
    </div>
  );
}

export default KategoriCard;
