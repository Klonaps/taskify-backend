declare global {
  namespace Express {
    interface User {
      id: number;
      login: string;
    }
  }
}
export {};
