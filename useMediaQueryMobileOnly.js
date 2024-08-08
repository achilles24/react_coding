// style.css
``` css
h1,
p {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
[data-mobile='true'] h1 {
  color: red;
}
```

// App.js
import React from 'react';
import useMatchMedia from './useMatchMedia';
import './style.css';

export default function App() {
  const isMobile = useMatchMedia();

  return (
    <div data-mobile={isMobile}>
      <h1>Hello StackBlitz!</h1>
      {isMobile && <p>Mobile only content</p>}
    </div>
  );
}

// useMatchMedia.js
const useMatchMedia = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 568px)').matches
  );

  useEffect(() => {
    const mediaMatcher = window.matchMedia('(max-width: 568px)');

    const updateDevice = () => {
      setIsMobile(mediaMatcher.matches);
    };

    if (mediaMatcher.addEventListener) {
      mediaMatcher.addEventListener('change', updateDevice);
      return () => {
        mediaMatcher.removeEventListener('change', updateDevice);
      };
    } else {
      // For older browser which doesn't support addEventListener for MediaQueryList
      mediaMatcher.addListener(updateDevice);
      return () => {
        mediaMatcher.removeListener(updateDevice);
      };
    }
  }, []);

  return isMobile;
};

export default useMatchMedia;
