import Listener from "./listener";

export default class Dispatcher {
    protected readonly listeners: Map<string, Listener[]>;

    public constructor() {
        this.listeners = new Map();
    }

    public async dispatch<TData extends {} = any>(type: string, data: TData): Promise<void> {
        // No listeners associated with this type.
        if (!this.listeners.has(type)) {
            return;
        }

        // Invoke corresponding listeners.
        for (const listener of this.listeners.get(type)!) {
            await listener(type, data, this);
        }
    }

    /**
     * Attach a listener to be invoked once the
     * specified event is triggered.
     */
    public listen(type: string, callback: Listener): void {
        // Create a listener array for this type if it does not already exist.
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }

        const listeners: Listener[] = this.listeners.get(type)!;

        // Append the listener if it does not already exist.
        if (listeners.includes(callback)) {
            listeners.push(callback);
        }
    }
}
