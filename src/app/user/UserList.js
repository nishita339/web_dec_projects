'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function UserList({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  async function handleReject(id) {
    if (!confirm("Are you sure you want to reject this invitation?")) return;

    try {
      const response = await fetch(`/api/user/${id}/visibility`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUsers(prev => prev.filter(user => user._id !== id));
      } else {
        console.error('Failed to update user visibility');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleAccept(id) {
    try {
      const response = await fetch(`/api/user/${id}/confirm`, {
        method: 'PUT',
      });

      if (response.ok) {
        setUsers(prev => prev.filter(user => user._id !== id));
      } else {
        console.error('Failed to confirm user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {users.map(user => (
        <div
          key={user._id}
          className="flex items-center justify-between rounded-lg bg-[#111a22] px-4 py-3 shadow-md hover:bg-[#1a2630] transition"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-700">
              <Image
                src={user.image || '/default-avatar.png'}
                alt={`Profile picture of ${user.name || 'User'}`}
                width={48}
                height={48}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-base font-medium truncate max-w-[180px]">{user.name}</p>
              <p className="text-[#93adc8] text-sm truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAccept(user._id)}
              className="rounded-xl bg-[#1980e6] hover:bg-[#1464b8] px-4 py-2 text-white text-sm font-semibold transition"
              aria-label="Accept invitation"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(user._id)}
              className="rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-white text-sm font-semibold transition"
              aria-label="Reject invitation"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <p className="text-center text-gray-400 pt-6 text-sm">No invitations pending.</p>
      )}
    </div>
  );
}
