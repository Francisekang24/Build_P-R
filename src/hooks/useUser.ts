import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {UserData} from '../types/UserData';

interface User {
  uid: string;
  name?: string;
  bio?: string;
  avatarURL?: string;
  Data?: UserData;
  // will add other user fields as needed
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      try {
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
            setAvatarURL(userData.avatarURL || '');
          }
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const updateUser = async (updates: Partial<User>) => {
    if (!auth.currentUser) return;

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, updates);
    setUser((prevUser) => prevUser ? { ...prevUser, ...updates } : prevUser);
  };

  const uploadAvatar = async () => {
    if (!auth.currentUser || !avatar) return;

    const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
    await uploadBytes(avatarRef, avatar);
    const url = await getDownloadURL(avatarRef);
    setAvatarURL(url);
    return url;
  };



  return {
    user,
    setAvatar,
    avatarURL,
    updateUser,
    uploadAvatar,
  };
};
