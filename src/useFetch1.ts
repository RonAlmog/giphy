import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // the return function from useEffect, aka 'cleanup function' runs when the component dismounts.
    return () => {
      // if the calling component dismounts (user has navigated elsewhere), abort the fetch.
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
