interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    linkedIn?: string;
    github?: string;
    website?: string;
}

interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
}

interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
}

interface Project {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
}

interface Certification {
    name: string;
    date: string;
    organization: string;
}

interface Skill {
    name: string;
    level: string;
}

interface Language {
    name: string;
    level: string;
}

interface UserData {
    firstName: string;
    lastName: string;
    title: string;
    position: string;
    contactInfo: ContactInfo;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skill[];
    languages: Language[];
    projects: Project[];
    certifications?: Certification[];
    summary?: string;
}

export type { UserData, ContactInfo, Education, WorkExperience, Project, Certification, Skill, Language };