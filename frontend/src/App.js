// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useData, usePostApi } from './hooks/useData';

function App() {
  const inputRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const { data, loading } = useData({ url: '/api/todo' });
  const {
    mutation,
    loading: mutateLoading,
    data: response,
    error: mutateError,
  } = usePostApi();
  if (loading) {
    return <p className="text-2xl">Loading...</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;
    if (inputRef.current.value === '') return;
    setSubmitted(true); // Mark the form as submitted
    mutation({
      method: 'post',
      url: '/api/todo',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: inputRef.current.value, completed: false }),
    }).then(() => {
      inputRef.current.value = '';
      setSubmitted(false);
    });
  };

  const handleEnter = (e) => {
    e.preventDefault(); // Prevent default Enter key behavior (like form submission if not handled)
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="text-2xl text-center font-semibold py-4">Todo</p>
      </header>
      <main>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 max-[480px]:flex-col px-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Todo"
              className="px-2 py-1 rounded-md border border-blue-200 md:w-1/2 outline-none"
              onKeyUp={handleEnter}
            />
            <button
              type="submit"
              className="p-2 bg-blue-300 hover:bg-red-300 hover:text-white rounded-lg"
            >
              {mutateLoading ? 'Loading..' : 'Add'}
            </button>
          </div>
        </form>
        <p className="text-2xl font-semibold text-center p-4">Existing List</p>
        <ul className="flex flex-col  gap-3 mx-auto lg:w-1/4 md:w-1/2 max-[450px]:w-[80vw] max-[450px]:mx-auto max-h-[60vh] overflow-auto px-2 ">
          {data.map((todo) => (
            <Todo key={todo._id} {...todo} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

const Todo = ({ id, title, completed }) => {
  if (title)
    return (
      <div className="flex flex-1 gap-3 ">
        <input type="checkbox" className="flex-8" />
        <li key={id} className="px-1 py-1 hover:bg-gray-200 rounded-lg flex-1 ">
          {title}
        </li>
        <button className="flex-8">D</button>
      </div>
    );
};
