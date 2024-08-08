// App.js
import React from 'react';
import useMatchMedia from './useMatchMedia';
import './style.css';

export default function App() {
  const deviceType = useMatchMedia();
  const isMobile = deviceType == 'mobile';
  const isTablet = deviceType == 'tablet';

  console.log(deviceType);

  return (
    <div data-mobile={isMobile}>
      {isTablet && <h1>Hello StackBlitz!</h1>}
      {isMobile && <p>Mobile only content</p>}
    </div>
  );
}

// useMatchMedia.js
import { useState, useEffect } from 'react';

const breakpoints = {
  mobile: '(max-width: 568px)',
  tablet: '(min-width: 569px) and (max-width: 1024px)',
  laptop: '(min-width: 1025px) and (max-width: 1440px)',
  desktop: '(min-width: 1441px)',
};

const useMatchMedia = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const mediaMatcher = {
      mobile: window.matchMedia(breakpoints.mobile),
      tablet: window.matchMedia(breakpoints.tablet),
      laptop: window.matchMedia(breakpoints.laptop),
      desktop: window.matchMedia(breakpoints.desktop),
    };

    const updateDeviceType = () => {
      setDeviceType(getDeviceType());
    };

    // To ensure state is accurate & to improve we call this method.
    updateDeviceType();

    Object.values(mediaMatcher).forEach((matcher) => {
      if (matcher.addEventListener) {
        matcher.addEventListener('change', updateDeviceType);
      } else {
        matcher.addListener(updateDeviceType);
      }
    });

    return () => {
      Object.values(mediaMatcher).forEach(matcher => {
        if (matcher.removeEventListener) {
          matcher.removeEventListener('change', updateDeviceType);
        } else {
          matcher.removeListener(pdateDeviceType);
        }
      })
    }
  }, []);

  // Function declaration because we're accessing this inside useState, if we use function expression or arrow function, we can't access, because those're not hoisted.
  function getDeviceType() {
    if (window.matchMedia(breakpoints.mobile).matches) return 'mobile';
    if (window.matchMedia(breakpoints.tablet).matches) return 'tablet';
    if (window.matchMedia(breakpoints.laptop).matches) return 'laptop';
    if (window.matchMedia(breakpoints.desktop).matches) return 'desktop';
    return 'desktop';
  }

  return deviceType;
};

export default useMatchMedia;
