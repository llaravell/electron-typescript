export interface newWindow{
    electron: {
        // every electron object from preload.ts
        sendNotification: (title: string, body: string) => void;
    };
}