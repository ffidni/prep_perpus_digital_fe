/* eslint-disable @next/next/no-img-element */
import ExpandableText from '@/app/components/expandable_text';
import ImageOnError, { QuoteAuthorImage } from '@/app/components/image-onerror';
import KategoriCard from '@/app/components/kategori/kategori_card';
import { PERPUSTAKAAN_ASSETS } from '@/app/constants';
import { getRandomQuote } from '@/app/network/get-quotes';
import { ApiService } from '@/app/network/services';
import Helper from '@/app/utils/helper';

import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: 'e-Maca - Jelajah',
  description:
    'Jelajahi berbagai kategori dan rekomendasi buku dari website e-Maca.',
};

async function Explore() {
  const quoteData = await getRandomQuote();
  const kategoriData = await ApiService.getItem({
    table: 'kategori-buku',
    params: { per_page: 10, page: 1 },
  })
    .then(({ data }) => data)
    .catch((err) => null);

  const rekomendasiBuku = await ApiService.getItem({
    table: 'buku',
    params: { per_page: 10, page: 1, rekomendasi: 1 },
  })
    .then(({ data }) => data)
    .catch((err) => null);

  const firstKategori = kategoriData.slice(0, 5);
  const secondKategori = kategoriData.slice(5, kategoriData.length);

  return (
    <div className="flex flex-col px-3 py-5 bg-white">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center pt-1">
          <p className="font-semibold">Book Related Quotes</p>
          <div className="flex flex-col w-full card  max-w-lg bg-sky-500 h-auto px-3 py-3 mt-5 rounded-lg ">
            <ExpandableText maxLength={200}>{quoteData.text}</ExpandableText>
            <div className="flex justify-end gap-3 pt-2 items-center">
              <p className="text-sm text-white font-semibold">
                {`- ${quoteData.author}${
                  quoteData.book ? ` - ${quoteData.book} Book` : ''
                }`}
              </p>
              <QuoteAuthorImage
                src={quoteData.author_img}
                className={
                  'object-cover w-16 h-16 rounded-full border-2 bg-white flex-shrink-0'
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-auto  sm:items-center">
          <RowTitle title={'Kategori Buku'} />
          <div className="flex gap-3 pt-3 overflow-x-auto ">
            {firstKategori.map(({ kategori_id, cover, nama_kategori }) => {
              return (
                <KategoriCard
                  key={kategori_id}
                  cover={cover}
                  kategori_id={kategori_id}
                  nama_kategori={nama_kategori}
                />
              );
            })}
          </div>
          <div className="flex gap-3 pt-3 overflow-x-auto">
            {secondKategori.map(({ kategori_id, cover, nama_kategori }) => {
              return (
                <KategoriCard
                  key={kategori_id}
                  cover={cover}
                  kategori_id={kategori_id}
                  nama_kategori={nama_kategori}
                />
              );
            })}
          </div>
        </div>

        <div className="rekomendasi flex flex-col sm:items-center">
          <RowTitle title={'Buku untuk Kamu'} />
          <div className="flex flex-wrap gap-3 pt-3 overflow-x-auto ">
            {rekomendasiBuku.map(
              ({
                buku_id,
                judul,
                penulis,
                penerbit,
                tahun_terbit,
                is_premium,
                cover,
                rating,
              }) => {
                return (
                  <div
                    className="flex flex-col items-center p-2 border-2 rounded-lg w-40"
                    key={buku_id}
                  >
                    <img
                      src={Helper.createAssetsLink(cover)}
                      alt=""
                      className="w-32 object-contain rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-xs max-w-36 pt-3">
                        {judul}
                      </p>
                      <p className="text-xs max-w-36 pt-1">{penulis}</p>
                      <p className="text-xs font-semibold max-w-36 pt-1 text-amber-500">
                        {rating ? rating : 'Belum ada ulasan'}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RowTitle({ title, onClick }) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-md font-semibold">{title}</p>
      <a
        className="btn-primary p-1 bg-gray-300 hover:bg-gray-200 text-sm font-medium"
        onClick={onClick}
      >
        Lihat Semua
      </a>
    </div>
  );
}

export default Explore;
