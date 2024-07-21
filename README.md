```javascript
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('counter/fetchPosts', async () => {
  const result = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10&page=1'
  );
  return await result.json();
});

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0, posts: [] },
  reducers: {
    incrementCount(state, action) {
      const payload = action.payload;
      state.count = state.count + payload;
    },
    decrementCount(state, action) {
      const payload = action.payload;
      state.count = state.count - payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading';
    }),
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.posts = state.posts.concat(action.payload);
    });
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { login: false },
  reducers: {
    loginUser: (state, action) => {
      const { payload } = action;
      state.login = payload;
    },
  },
});

export const counterAction = counterSlice.actions;

export const authAction = authSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

import { counterAction, authAction, fetchPosts } from './store.js';

export default function App() {
  // const [posts, setPosts] = useState([]);
  const counter = useSelector((state) => state.counter.count);
  const posts = useSelector((state) => state.counter.posts);
  const status = useSelector((state) => state.counter.status);
  const login = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();

  console.log(posts);

  const { incrementCount, decrementCount } = counterAction;
  const { loginUser } = authAction;

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const increment = () => {
    dispatch(incrementCount(1));
  };

  const decrement = () => {
    dispatch(decrementCount(1));
  };

  const handleLogin = () => {
    dispatch(loginUser(!login));
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <div style={{ marginTop: '8px' }}>
        <button onClick={handleLogin}>{!login ? 'Login' : 'Logout'}</button>
      </div>
      {status === 'succeeded' &&
        posts.length &&
        posts.map((each) => {
          return <p>{each.title}</p>;
        })}
    </div>
  );
}

```
