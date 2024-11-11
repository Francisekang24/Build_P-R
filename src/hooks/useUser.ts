import { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import {Certification, ContactInfo, Education, Language, Project, Skill, WorkExperience, } from '../types/UserData';
import { u } from 'framer-motion/client';

interface User {
  uid: string;
  name?: string;
  bio?: string;
  avatarURL?: string;
  contactInfo?: ContactInfo;
  education?: Education[];
  experience?: WorkExperience[];
  skills?: Skill[];
  languages?: Language[];
  certifications?: Certification[];
  projects?: Project[];
  summary?: string;
  // will add other user fields as needed
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');

  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  
  const [education, setEducation] = useState<Education[] | null>(null);
  const [experience, setExperience] = useState<WorkExperience[] | null>(null);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [certifications, setCertifications] = useState<Certification[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

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

  const UpdateContactInfo = async (contactInfo: ContactInfo) => {
    if (!auth.currentUser) return;

    await updateUser({ contactInfo });
    setContactInfo(contactInfo);
  }

  const UpdateEducation = async (education: Education[]) => {
    if (!auth.currentUser) return;

    await updateUser({ education });
    setEducation(education);
  }

  const UpdateExperience = async (experience: WorkExperience[]) => {
    if (!auth.currentUser) return;

    await updateUser({ experience });
    setExperience(experience);
  }

  const UpdateSkills = async (skills: Skill[]) => {
    if (!auth.currentUser) return;

    await updateUser({ skills });
    setSkills(skills);
  }

  const UpdateLanguages = async (languages: Language[]) => {
    if (!auth.currentUser) return;

    await updateUser({ languages });
    setLanguages(languages);
  }

  const UpdateCertifications = async (certifications: Certification[]) => {
    if (!auth.currentUser) return;

    await updateUser({ certifications });
    setCertifications(certifications);
  }

  const UpdateProjects = async (projects: Project[]) => {
    if (!auth.currentUser) return;

    await updateUser({ projects });
    setProjects(projects);
  }

  const UpdateSummary = async (summary: string) => {
    if (!auth.currentUser) return;

    await updateUser({ summary });
    setSummary(summary);
  }


  return {
    user,
    setAvatar,
    avatarURL,
    updateUser,
    uploadAvatar,
    contactInfo,
    UpdateContactInfo,
    education,
    UpdateEducation,
    experience,
    UpdateExperience,
    skills,
    UpdateSkills,
    languages,
    UpdateLanguages,
    certifications,
    UpdateCertifications,
    projects,
    UpdateProjects,
    summary,
    UpdateSummary,
  };
};
