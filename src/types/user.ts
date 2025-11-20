export interface UserData {
  email: string | null;
  location: string;
  coordinates: {
    nx: number;
    ny: number;
  };
  createdAt?: string;
}
