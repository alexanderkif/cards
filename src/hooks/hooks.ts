import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

//   const [name, setName] = useLocalStorage('name', 'John Doe');
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <p>Hello, {name}!</p>

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
};

//   const isMobile = useMediaQuery('(max-width: 768px)');
//       <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };
  return [value, toggle];
};

//   const [isModalOpen, toggleModal] = useToggle(false);
//       <button onClick={toggleModal}>Toggle Modal</button>
//       {isModalOpen && <Modal />}

export const useDebounce = (value: unknown, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     // Perform search API call with debouncedSearchTerm
//     // ...
//   }, [debouncedSearchTerm]);
//   return (
//     <div>
//       <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//     </div>
//   );
// };

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, loading };
};

// const App = () => {
//   const { data, error, loading } = useFetch('https://api.example.com/data');

//   if (loading) {
//     return <p>Loading data...</p>;
//   }
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
//   return (
//     <div>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
