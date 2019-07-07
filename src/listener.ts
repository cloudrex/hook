import Dispatcher from "./dispatcher";

type Listener<T = any> = (type: string, data: T, sender: Dispatcher) => Promise<void>;

export default Listener;
