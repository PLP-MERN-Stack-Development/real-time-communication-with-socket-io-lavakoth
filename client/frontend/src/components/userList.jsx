// src/components/UserList.jsx
export default function UserList({ users, currentUser }) {
  return (
    <div className="w-64 border-l p-4">
      <h3 className="font-bold text-lg mb-3">Online Users ({users.length})</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center space-x-2 text-sm ${
              user.id === currentUser?.id ? 'font-bold text-blue-600' : ''
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}