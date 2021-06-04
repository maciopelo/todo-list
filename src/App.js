import './App.css';
import {useDispatch, useSelector} from "react-redux"
import {incrementCounter, decrementCounter} from "./redux/actions/counter.actions"

function App() {

  const dispatch = useDispatch();
  const {counter} = useSelector(state => state);



  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={()=>dispatch(incrementCounter())}>+</button>
      <button onClick={()=>dispatch(decrementCounter())}>-</button>
    </div>
  );
}

export default App;
