export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      PORT: number;
      USER: string;
      PASSWORD: string;
      DATABASE: string;
    }
  }
}
