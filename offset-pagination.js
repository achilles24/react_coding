import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

export default function App() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const totalItems = 200;
  const limit = 10;

  const totalPage = Math.floor(totalItems / limit);

  const fetchDatas = async (pageIndex) => {
    let url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${pageIndex}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  const updatePaginationButtons = useCallback(() => {
    setShowPrev(page > 1);
    setShowNext(page < totalPage);
  }, [page]);

  useEffect(() => {
    fetchDatas(page).then((products) => {
      setDatas(products);
    });
    updatePaginationButtons();
  }, [page]);

  const handleNext = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const onPageClick = useCallback((pageNo) => {
    setPage(pageNo);
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>COMPLETED</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data?.userId}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        onNextClick={handleNext}
        onPrevClick={handlePrev}
        showPrev={showPrev}
        showNext={showNext}
        onPageClick={onPageClick}
        totalPage={totalPage}
      />
    </div>
  );
}

const Pagination = React.memo(
  ({
    onPrevClick,
    onNextClick,
    showPrev,
    showNext,
    onPageClick,
    totalPage,
  }) => {
    const pageNumbers = Array.from(
      { length: totalPage },
      (_, index) => index + 1
    );

    return (
      <div>
        <button disabled={!showPrev} onClick={onPrevClick}>
          Prev
        </button>
        {pageNumbers.map((each) => (
          <button onClick={() => onPageClick(each)}>{each}</button>
        ))}
        <button disabled={!showNext} onClick={onNextClick}>
          Next
        </button>
      </div>
    );
  }
);
