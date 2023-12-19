'use strict';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from '../../utils/useSearchParams';
import styles from './ProductPage.module.scss';
import ProductList from '../../components/ProductList/ProductList';
import { selectProducts, setProducts } from '../../store/productsSlice';
import { InfoPage } from '../../types/InfoPage';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useParams } from 'react-router-dom';
import { CategoriesTypes } from '../../types/Categories';

export const ProductPage = () => {
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [infoPage, setInfoPage] = useState<InfoPage>();
  const dispatch = useDispatch();
  const products = useAppSelector(selectProducts);
  const { page, perPage, sort, setSearchParams } = useSearchParams();
  const { type } = useParams();

  const API_URL = `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${type}`;

  useEffect(() => {
    axios
      .get(`${API_URL}?page=${page}&perPage=${perPage}&sort=${sort}`)
      .then((res) => {
        dispatch(setProducts(res.data.records));
        setInfoPage(res.data.info);
        setTotal(res.data.info.totalRecords);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsError(e);
      });
  }, [page, perPage, sort, type]);

  const handleSearchParams = (setKey: string, value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(setKey, value);
      console.log(setKey, value);
      return searchParams;
    });
  };

  const pageTitle = (type?: string) => {
    let currenType;

    switch (type) {
    case 'phones':
      currenType = CategoriesTypes.Phones;
      break;
    case 'tablets':
      currenType = CategoriesTypes.Tablets;
      break;
    case 'accessories':
      currenType = CategoriesTypes.Accessories;
      break;

    default:
      break;
    }

    return currenType;
  };

  return (
    <div className={`${styles.wrapper} ${styles.catalog}`}>
      <section className={styles.catalog__info}>
        <h2 className={styles.catalog__title}>{pageTitle(type)}</h2>
        <p className={styles.catalog__modelCount}>{`${total} models`}</p>
      </section>

      <section className={styles.catalog__filters}>
        <div>
          <p className={styles.catalog__filters_title}>Sort by</p>
          <Dropdown
            list={[
              ['age', 'Newest'],
              ['title', 'Alphabetically'],
              ['price', 'Price'],
            ]}
            currentItem={'Newest'}
            setOn={'sort'}
            onHandle={handleSearchParams}
          />
        </div>
        <div>
          <p className={styles.catalog__filters_title}>Items on page</p>
          <Dropdown
            list={[
              ['4', '4'],
              ['8', '8'],
              ['16', '16'],
              ['all', 'all'],
            ]}
            currentItem={'16'}
            setOn={'perPage'}
            onHandle={handleSearchParams}
            rootClassName={'set-width'}
          />
        </div>
      </section>
      <section className={styles.catalog__products}>
        <ProductList
          products={products}
          infoPage={infoPage}
          status={isLoading}
        />
      </section>
      {isError && <p>Error...</p>}
    </div>
  );
};
