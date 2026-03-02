import { useEffect, useRef } from 'react';


/////////make our own hook (auto scroll) to use it in different components///////
// To use a function as a hook, the function name must start with "use"

export default function useAutoScroll(dependencies) {
  // It's highly recommend to rename this to something more generic like containerRef.
  
  const containerRef = useRef(null);

  useEffect(() => {

    const containerElem = containerRef.current;

    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }

    }, [dependencies]);
  return containerRef;
}