type newWindow = {
    electron: {
        // every electron object from preload.ts
        sendNotification: (title: string, body: string) => void;
    };
}
const newWindow = window as unknown as Window & typeof globalThis & newWindow;

newWindow.electron.sendNotification('Hello', 'World');


