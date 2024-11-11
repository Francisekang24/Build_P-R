import { ReactNode } from 'react';

export interface NavbarProps {
    backgroundColor: string;
    textColor: string;
    logo: ReactNode | string;
    links: { href: string; label: string }[];
}

export interface IntroductionProps {
    title: string;
    subtitle: string;
    description: string;
}

export interface AboutProps {
    title: string;
    description: string;
    image?: string;
}

export interface PortfolioProps {
    title: string;
    description: string;
    projects: ProjectProps[];
}

export interface ProjectProps {
    title: string;
    description: string;
    image: string;
}

export interface ResumeProps {
    title: string;
    description: string;
    experiences: ExperienceProps[];
    education: EducationProps[];
}

export interface ExperienceProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface EducationProps {
    title: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface SkillsProps {
    title: string;
    description: string;
    skills: string[];
}

export interface blogProps {
    title: string;
    description: string;
    link: string;
}

export interface ContactProps {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
}

export interface SocialProps {
    title: string;
    description: string;
    socials: SocialLinkProps[];
}

export interface SocialLinkProps {
    name: string;
    link: string;
    icon: ReactNode;
}




