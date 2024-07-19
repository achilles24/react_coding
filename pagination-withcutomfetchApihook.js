import React, { useEffect, useState } from 'react';
import usefetch from './useFetch';
import './style.css';

let url = 'https://fakestoreapi.com/products/';

export default function App() {
  const { data, isLoading, isError } = usefetch(url);
  const [page, setPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    setShowPrev(page > 1);
  }, [page]);

  const itemPerPage = 5;
  let lastIndex = page * itemPerPage;
  let firstIndex = lastIndex - itemPerPage;

  let result = data.slice(firstIndex, lastIndex);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {isLoading && <p>Loading...</p>}
      {isLoading || (
        <>
          <div className="image-container">
            {result &&
              result.map((each) => {
                return (
                  <div key={each.id} className="image">
                    <img src={each.image} />
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

const usefetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchApi = async () => {
    setIsLoading(true);
    try {
      let result = await fetch(url);
      let response = await result.json();
      setData(response);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data, isLoading, isError };
};
