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

interface UserData {
    firstName: string;
    lastName: string;
    contactInfo: ContactInfo;
    education: Education[];
    workExperience: WorkExperience[];
    skills: string[];
    languages: string[];
    projects: Project[];
    certifications?: string[];
    summary?: string;
}

export default UserData;