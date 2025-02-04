import Pushup from "./pushup";

interface User {
  id?: number;
  email: string;
  name: string;
  pushups: Pushup[];
}

export default User;
