type newWindow = {
    electron: {
        // every electron object from preload.ts
    };
}
 const newWindow = window as unknown as Window & typeof globalThis & newWindow;


