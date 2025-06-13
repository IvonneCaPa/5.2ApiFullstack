import React from 'react';
import { useUsers } from '../hooks/useApi';

const Users = () => {
  const { data: users, loading, error, refetch } = useUsers(1, 10);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Usuarios</h1>
      <button onClick={refetch}>Recargar</button>
      {users?.data?.map(user => (
        <div key={user.id} className="p-4 border-b">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;