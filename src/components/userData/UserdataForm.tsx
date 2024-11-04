
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { UserData, Certification, ContactInfo, Education, Language, Project, Skill, WorkExperience } from "../../types/UserData";
import { Input, Textarea } from "@nextui-org/react";

export default function UserdatatForm() {

    const { user, updateUser } = useUser();
    const [formData, setFormData] = useState<UserData | null>(null);

    useEffect(() => {
        if (user && user.Data) {
            setFormData(user.Data);
        } else {
            setFormData(null);
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        section?: keyof UserData | keyof ContactInfo
    ) => {
        const { name, value } = e.target;

        if (section === 'contactInfo') {
            setFormData((prev: UserData | null) => ({
                ...prev!,
                contactInfo: {
                    ...prev!.contactInfo,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev: UserData | null) => ({
                ...prev!,
                [name]: value,
            }));
        }
    };


    // Education 
    const addEducation = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            education: [
                ...prev!.education,
                {
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startDate: '',
                    endDate: '',
                },
            ],
        }));
    };

    const removeEducation = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            education: prev!.education.filter((_: Education, i: number) => i !== index),
        }));
    };

    const updateEducation = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            education: prev!.education.map((edu: Education, i: number) =>
                i === index ? { ...edu, [name]: value } : edu
            ),
        }));
    };

    // Work Experience
    const addWorkExperience = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: [
                ...prev!.workExperience,
                {
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    responsibilities: [],
                },
            ],
        }));
    };

    const removeWorkExperience = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: prev!.workExperience.filter((_: WorkExperience, i: number) => i !== index),
        }));
    };

    const updateWorkExperience = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: prev!.workExperience.map((exp: WorkExperience, i: number) =>
                i === index ? { ...exp, [name]: value } : exp
            ),
        }));
    };

    // Responsiblities
    const addResponsibility = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: prev!.workExperience.map((exp: WorkExperience, i: number) =>
                i === index
                    ? {
                        ...exp,
                        responsibilities: [...exp.responsibilities, ''],
                    }
                    : exp
            ),
        }));
    };

    const removeResponsibility = (index: number, resIndex: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: prev!.workExperience.map((exp: WorkExperience, i: number) =>
                i === index
                    ? {
                        ...exp,
                        responsibilities: exp.responsibilities.filter((_: string, j: number) => j !== resIndex),
                    }
                    : exp
            ),
        }));
    };

    const updateResponsibility = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        resIndex: number
    ) => {
        const { value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            workExperience: prev!.workExperience.map((exp: WorkExperience, i: number) =>
                i === index
                    ? {
                        ...exp,
                        responsibilities: exp.responsibilities.map((res: string, j: number) =>
                            j === resIndex ? value : res
                        ),
                    }
                    : exp
            ),
        }));
    };

    // Skills
    const addSkill = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            skills: [
                ...prev!.skills,
                {
                    name: '',
                    level: '',
                },
            ],
        }));
    };

    const removeSkill = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            skills: prev!.skills.filter((_: Skill, i: number) => i !== index),
        }));
    };

    const updateSkill = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            skills: prev!.skills.map((skill: Skill, i: number) =>
                i === index ? { ...skill, [name]: value } : skill
            ),
        }));
    };

    // Languages
    const addLanguage = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            languages: [
                ...prev!.languages,
                {
                    name: '',
                    level: '',
                },
            ],
        }));
    };

    const removeLanguage = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            languages: prev!.languages.filter((_: Language, i: number) => i !== index),
        }));
    };

    const updateLanguage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            languages: prev!.languages.map((lang: Language, i: number) =>
                i === index ? { ...lang, [name]: value } : lang
            ),
        }));
    };

    // Projects
    const addProject = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: [
                ...prev!.projects,
                {
                    name: '',
                    description: '',
                    technologies: [],
                    link: '',
                },
            ],
        }));
    };

    const removeProject = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: prev!.projects.filter((_: Project, i: number) => i !== index),
        }));
    };

    const updateProject = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: prev!.projects.map((project: Project, i: number) =>
                i === index ? { ...project, [name]: value } : project
            ),
        }));
    };

    // Technologies
    const addTechnology = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: prev!.projects.map((project: Project, i: number) =>
                i === index
                    ? {
                        ...project,
                        technologies: [...project.technologies, ''],
                    }
                    : project
            ),
        }));
    };

    const removeTechnology = (index: number, techIndex: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: prev!.projects.map((project: Project, i: number) =>
                i === index
                    ? {
                        ...project,
                        technologies: project.technologies.filter((_: string, j: number) => j !== techIndex),
                    }
                    : project
            ),
        }));
    };

    const updateTechnology = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        techIndex: number
    ) => {
        const { value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            projects: prev!.projects.map((project: Project, i: number) =>
                i === index
                    ? {
                        ...project,
                        technologies: project.technologies.map((tech: string, j: number) =>
                            j === techIndex ? value : tech
                        ),
                    }
                    : project
            ),
        }));
    };

    // Certifications
    const addCertification = () => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            certifications: [
                ...prev!.certifications!,
                {
                    name: '',
                    date: '',
                    organization: '',
                },
            ],
        }));
    };

    const removeCertification = (index: number) => {
        setFormData((prev: UserData | null) => ({
            ...prev!,
            certifications: prev!.certifications!.filter((_: Certification, i: number) => i !== index),
        }));
    };

    const updateCertification = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { name, value } = e.target;

        setFormData((prev: UserData | null) => ({
            ...prev!,
            certifications: prev!.certifications!.map((cert: Certification, i: number) =>
                i === index ? { ...cert, [name]: value } : cert
            ),
        }));
    };

    // Summary
    const updateSummary = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
    
        setFormData((prev: UserData | null) => ({
            ...prev!,
            summary: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUser({ Data: formData || undefined });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile: ", error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Data</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="text"
                    label="First Name"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="text"
                    label="Title"
                    name="title"
                    value={formData?.title}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="text"
                    label="Position"
                    name="position"
                    value={formData?.position}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="email"
                    label="Email"
                    name="email"
                    value={formData?.contactInfo?.email}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="tel"
                    label="Phone"
                    name="phone"
                    value={formData?.contactInfo?.phone}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    isRequired
                    labelPlacement="outside"
                    type="text"
                    label="Address"
                    name="address"
                    value={formData?.contactInfo?.address}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    labelPlacement="outside"
                    type="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={formData?.contactInfo?.linkedIn}
                    onChange={(e) => handleChange(e, 'contactInfo')}
                />
                <Input
                    labelPlacement="outside"
                    type="text"
                    label="GitHub"
                    name="github"
                    value={formData?.contactInfo?.github}
                    onChange={(e) => handleChange(e, 'contactInfo')}
                />
                <Input
                    labelPlacement="outside"
                    type="text"
                    label="Website"
                    name="website"
                    value={formData?.contactInfo?.website}
                    onChange={(e) => handleChange(e, 'contactInfo')}
                />
                <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
                {formData?.education.map((edu: Education, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Institution"
                            name="institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Degree"
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Field of Study"
                            name="fieldOfStudy"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateEducation(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="date"
                            label="Start Date"
                            name="startDate"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(e, index)}
                        />
                        <Input
                            labelPlacement="outside"
                            type="date"
                            label="End Date"
                            name="endDate"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(e, index)}
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeEducation(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addEducation}
                >
                    Add Education
                </button>
                <h2 className="text-xl font-semibold mt-6 mb-2">Work Experience</h2>
                {formData?.workExperience.map((exp: WorkExperience, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Company"
                            name="company"
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Position"
                            name="position"
                            value={exp.position}
                            onChange={(e) => updateWorkExperience(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="date"
                            label="Start Date"
                            name="startDate"
                            value={exp.startDate}
                            onChange={(e) => updateWorkExperience(e, index)}
                        />
                        <Input
                            labelPlacement="outside"
                            type="date"
                            label="End Date"
                            name="endDate"
                            value={exp.endDate}
                            onChange={(e) => updateWorkExperience(e, index)}
                        />
                        <h3 className="text-lg font-semibold mt-4 mb-2">Responsibilities</h3>
                        {exp.responsibilities.map((res: string, resIndex: number) => (
                            <div key={resIndex} className="mb-2">
                                <Input
                                    isRequired
                                    labelPlacement="outside"
                                    type="text"
                                    label="Responsibility"
                                    name="responsibility"
                                    value={res}
                                    onChange={(e) => updateResponsibility(e, index, resIndex)}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => removeResponsibility(index, resIndex)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn"
                            onClick={() => addResponsibility(index)}
                        >
                            Add Responsibility
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeWorkExperience(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addWorkExperience}
                >
                    Add Work Experience
                </button>
                <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
                {formData?.skills.map((skill: Skill, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Name"
                            name="name"
                            value={skill.name}
                            onChange={(e) => updateSkill(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Level"
                            name="level"
                            value={skill.level}
                            onChange={(e) => updateSkill(e, index)}
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeSkill(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addSkill}
                >
                    Add Skill
                </button>
                <h2 className="text-xl font-semibold mt-6 mb-2">Languages</h2>
                {formData?.languages.map((lang: Language, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Name"
                            name="name"
                            value={lang.name}
                            onChange={(e) => updateLanguage(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Level"
                            name="level"
                            value={lang.level}
                            onChange={(e) => updateLanguage(e, index)}
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeLanguage(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addLanguage}
                >
                    Add Language
                </button>
                <h2 className="text-xl font-semibold mt-6 mb-2">Projects</h2>
                {formData?.projects.map((project: Project, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Name"
                            name="name"
                            value={project.name}
                            onChange={(e) => updateProject(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Description"
                            name="description"
                            value={project.description}
                            onChange={(e) => updateProject(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Technologies"
                            name="technologies"
                            value={project.technologies.join(',')}
                            onChange={(e) => updateProject(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Link"
                            name="link"
                            value={project.link}
                            onChange={(e) => updateProject(e, index)}
                        />
                        <h3 className="text-lg font-semibold mt-4 mb-2">Technologies</h3>
                        {project.technologies.map((tech: string, techIndex: number) => (
                            <div key={techIndex} className="mb-2">
                                <Input
                                    isRequired
                                    labelPlacement="outside"
                                    type="text"
                                    label="Technology"
                                    name="technology"
                                    value={tech}
                                    onChange={(e) => updateTechnology(e, index, techIndex)}
                                />
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => removeTechnology(index, techIndex)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn"
                            onClick={() => addTechnology(index)}
                        >
                            Add Technology
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeProject(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addProject}
                >
                    Add Project
                </button>
                <h2 className="text-xl font-semibold mt-6 mb-2">Certifications</h2>
                {formData?.certifications?.map((cert: Certification, index: number) => (
                    <div key={index} className="mb-4">
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Name"
                            name="name"
                            value={cert.name}
                            onChange={(e) => updateCertification(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="date"
                            label="Date"
                            name="date"
                            value={cert.date}
                            onChange={(e) => updateCertification(e, index)}
                        />
                        <Input
                            isRequired
                            labelPlacement="outside"
                            type="text"
                            label="Organization"
                            name="organization"
                            value={cert.organization}
                            onChange={(e) => updateCertification(e, index)}
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={() => removeCertification(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn"
                    onClick={addCertification}
                >
                    Add Certification
                </button>
                <Textarea
                    label="Summary"
                    labelPlacement="outside"
                    name="summary"
                    value={formData?.summary || ''}
                    onChange={updateSummary} 
                />

                <button type="submit" className="btn">Save</button>
            </form>
        </div>
    );
};