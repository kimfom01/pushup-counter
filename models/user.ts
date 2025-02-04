import Pushup from "./pushup";

interface User {
  id?: number;
  clerkId: string;
  email: string;
  name: string;
  pushups: Pushup[];
}

export default User;
