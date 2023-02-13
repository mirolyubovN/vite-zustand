import { create } from 'zustand';

import './App.css';

interface User {
  id: number;
  username: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (username: string) => void;
  fetchUsers: () => void;
}

const useUserStore = create<UsersState>()((set) => ({
  users: [],
  currentUser: null,
  settings: {},
  isLoading: false,
  errors: [],
  addUser: (username: string) => set(state => (
    {
      users: [
        ...state.users,
        {id: Date.now(), username}
      ]

    }
  )),
  fetchUsers: async() => {
    const results = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await results.json() as User[];

    set(state => (
      {
        users: [
          ...state.users,
          ...json
        ]
      }
  ))
  }
}));


function App() {

  const users = useUserStore(state => state.users);
  const addUser = useUserStore(state => state.addUser);
  const fetchUsers = useUserStore(state => state.fetchUsers);

  return (
    <div className="App">
      {users.map(user => (
        <div>{user.id}. {user.username}</div>
      ))}
      <button onClick={() => addUser('New user')}>Add user</button>
      <button onClick={() => fetchUsers()}>Fetch random users</button>
    </div>
  )
}

export default App
