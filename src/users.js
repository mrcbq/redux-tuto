import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/users/usersSlice';

export default function Users() {
  const { users, isLoading, error } = useSelector((state) => {
    console.log(state);
    return state.users;
  });
  const dispatch = useDispatch();
  // console.log('users:', users, 'isloading:', isLoading, 'error:', error);
  // console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id.value}>
            name: {user.name.first} {user.name.last}
            <img src={user.picture.large} alt={user.gender} />
          </li>
        ))}
      </ul>
    </div>
  );
}
