import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center">
        <div className="mx-auto bg-slate-400 rounded-md border-[1px] border-black p-6">
          <h2 className="mb-6 text-4xl">Counter: {count}</h2>
          <div className="flex *:m-1">
            <button
              className="bg-green-500 p-1 rounded-md"
              onClick={() => setCount((count) => count + 1)}
            >
              +increment
            </button>
            <button
              className="bg-red-500 p-1 rounded-md"
              onClick={() => setCount((count) => count - 1)}
            >
              -increment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
