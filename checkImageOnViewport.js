// index.js

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.js';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// App.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from './useFetch.js';
import Image from './Image.js';
import { authSliceActions, fetchUsers } from './reducers/authReducers.js';
import './style.css';

const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';

export default function App() {
  const { data: photos, loading } = useFetch(url);
  const title = useSelector((state) => state.auth.title);
  const status = useSelector((state) => state.auth.status);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const { updateTitle } = authSliceActions;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const update = () => {
    dispatch(updateTitle());
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={update}>Update Title</button>
      {(status == 'loading' || status == undefined) && <p>Loading User...</p>}
      {status == 'completed' && <p>{users?.name}</p>}
      {loading && <p>Loading...</p>}
      {photos &&
        photos?.map((each) => {
          return (
            <Image
              key={each.id}
              title={each.title}
              id={each.id}
              url={each.thumbnailUrl}
            />
          );
        })}
    </div>
  );
}

// Image.js

import React, { useState, useEffect, useRef } from 'react';

const Image = ({ url, title }) => {
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  const isInView = () => {
    const rect = imgRef.current.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const onMouseScroll = () => {
    setInView(isInView());
  };

  useEffect(() => {
    setInView(isInView());
    window.addEventListener('scroll', onMouseScroll);
    return () => {
      window.removeEventListener('scroll', onMouseScroll);
    };
  }, []);

  return (
    <li style={{ listStyle: 'none' }}>
      <figure ref={imgRef} className={inView ? '' : 'grey'}>
        <img src={url} alt={title} />
        <figcaption>{title}</figcaption>
      </figure>
    </li>
  );
};

export default Image;


// useFetch.js
import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    let response = await fetch(url)
      .then((result) => {
        setLoading(false);
        return result.json();
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
    return response;
  };

  useEffect(() => {
    fetchUser().then((result) => setData(result));
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authReducers.js';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  let response = await fetch(
    'https://jsonplaceholder.typicode.com/users?_limit=10'
  );
  return await response.json();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { title: 'hello' },
  reducers: {
    updateTitle(state) {
      state.title = `${state.title} world!`;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading';
    }),
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'completed';
        state.users = action.payload[0];
      });
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
