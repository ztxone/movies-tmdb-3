'use client';
import { useEffect, useState } from 'react';
import useUserStore from '@/lib/userStore';

const AdminPage = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUserStore((state) => state.user);

  const getUsers = async () => {
    const data = await fetch(`http://localhost:8080/users`, {
      method: 'GET',
    });
    const users = await data.json();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="container">
      <h2 className="font-bold mb-8">Authenticated users:</h2>
      <div className="space-y-4">
        {loading && <div>Loading Users</div>}
        {users && users?.map((user: any) => (
            <div className="grid grid-cols-2 gap-4" key={user.id}>
              <div>Email: {user.email}</div>
              <div>Role: {user.role}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminPage