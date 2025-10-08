import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

export function ReduxCounter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Redux Counter</h2>
      <p>Valeur: {count}</p>
      
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
