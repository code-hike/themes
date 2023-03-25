let worker = null;

let id = 0;

const callbacks = new Map();

export function highlight(code, lang, theme) {
  const currentId = id++;
  const promise = new Promise((resolve) => {
    callbacks.set(currentId, resolve);
  });

  if (!worker) {
    worker = new Worker(new URL("../worker.ts", import.meta.url));
    worker.onmessage = (event: MessageEvent<any>) => {
      const { id, ...result } = event.data;
      callbacks.get(id)(result);
      callbacks.delete(id);
    };
  }

  worker.postMessage({ code, lang, theme, id: currentId });

  return { promise, waitingFor: currentId };
}
