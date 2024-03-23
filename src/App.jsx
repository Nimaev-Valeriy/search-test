import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { joke } from "./redux/slice/joke";

function App() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (input.length >= 3) {
      dispatch(joke(input));
    }
  }, [input, dispatch]);
  const jokes = useSelector((state) => state.joke.data);
  function mapIsJoke(value) {
    const result = value.map((el) => el.result);
    const flat = result.map((el) => el.map((item) => item)).flat();
    return [...new Set(flat)];
  }
  const result = mapIsJoke(jokes);
  console.log("result: ", result);
  return (
    <div className="container">
      <div className="search-input">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search joke"
          autoFocus
        />
      </div>
      <div className="search-results">
        {result.map((el, i) => {
          return (
            <div className="result__body" key={i}>
              <p>{el.value}</p>
              <div className="bottom">
                <p>{el.id}</p>
                <p>
                  {new Date(Date.parse(el.created_at))
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, ".")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
