import React, { useEffect, useState, useRef } from 'react';
import usefetch from './useFetch';
import useDebounce from './useDebounce';
import './style.css';

let url = 'https://fakestoreapi.com/products/';
export default function App() {
  // usefetch custom hooks
  const { data, isLoading, isError } = usefetch(url);
  
  const [searchTerm, setSearchTerm] = useState('');
  // useDebounce custom hooks
  const keyword = useDebounce(searchTerm);
  const [page, setPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    setShowPrev(page > 1);
  }, [page]);

  const itemPerPage = 20;
  let lastIndex = page * itemPerPage;
  let firstIndex = lastIndex - itemPerPage;

  let result = data && data.slice(firstIndex, lastIndex);

  if (!!keyword) {
    result = result.filter((each) => each.title.includes(keyword));
  }

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>

      <input onChange={handleInput} value={searchTerm} />

      {isLoading && <p>Loading...</p>}
      {isLoading || (
        <>
          <div className="image-container">
            {result &&
              result.map((each) => {
                return (
                  <div key={each.id} className="image">
                    <p>{each.title}</p>
                  </div>
                );
              })}
          </div>
          <button disabled={!showPrev} onClick={handlePrev}>
            Prev
          </button>
          <button disabled={!showNext} onClick={handleNext}>
            Next
          </button>
        </>
      )}
    </div>
  );
}

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    try {
      let result = await fetch(url);
      let response = await result.json();
      setData(response);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data, isLoading, isError };
};

const useDebounce = (keyword, delay = 500) => {
  const [search, setSearch] = useState();
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setSearch(keyword);
    }, delay);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [keyword, delay]);

  return search;
};
