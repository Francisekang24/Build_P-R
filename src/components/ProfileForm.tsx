import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import UploadAvatar from './UploadAvatar';

export default function ProfileForm() {

  const { user, setAvatar, avatarURL, updateUser, uploadAvatar } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updates: any = {};

      if (name.trim() !== '') {
      updates.name = name;
      }

      if (bio.trim() !== '') {
      updates.bio = bio;
      }

      if (avatarURL) {
      const url = await uploadAvatar();
      updates.avatarURL = url;
      }

      if (Object.keys(updates).length === 0) {
      alert('No changes to update.');
      return;
      }

      await updateUser(updates);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert('Failed to update profile.');
    }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm 
           py-2 px-3 focus:outline-none focus:ring-indigo-500 
           focus:border-indigo-500 sm:text-sm"
    />
    </div>
    <div>
    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
      Bio
    </label>
    <textarea
      id="bio"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm 
           py-2 px-3 focus:outline-none focus:ring-indigo-500 
           focus:border-indigo-500 sm:text-sm"
    />
    </div>
    <UploadAvatar avatarURL={avatarURL} setAvatar={setAvatar} />
    <button
    type="submit"
    className="w-full flex justify-center py-2 px-4 border border-transparent 
           rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
           hover:bg-indigo-700 focus:outline-none focus:ring-2 
           focus:ring-offset-2 focus:ring-indigo-500"
    >
    Update Profile
    </button>
  </form>
  )
}