import { Divider, Tabs, Tab } from "@nextui-org/react";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Language from "./sections/Language";
import Certificate from "./sections/Ceritficate";
import Project from "./sections/Project";
import Summary from "./sections/Summary";


export default function UserdataForm() {

    return (
        <div className="max-w-3xl h-screen mx-auto p-6 mt-6 bg-zinc-50">
            <div className="space-y-1">
                <h4 className="text-center text-2xl font-medium">Information</h4>
            </div>
            <Divider className="my-4" />
            <Tabs aria-label='Tabs' fullWidth size="md">
                    <Tab key="contact" title="contact">
                        <Contact />
                    </Tab>
                    <Tab key="education" title="education">
                        <Education />
                    </Tab>
                    <Tab key="experience" title="experience">
                        <Experience />
                    </Tab>
                    <Tab key="skills" title="skills">
                        <Skills />
                    </Tab>
                    <Tab key="languages" title="languages">
                        <Language />
                    </Tab>
                    <Tab key="certifications" title="certifications">
                        <Certificate />
                    </Tab>
                    <Tab key="projects" title="projects">
                        <Project />
                    </Tab>
                    <Tab key="summary" title="summary">
                        <Summary />
                    </Tab>
            </Tabs>
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">View and edit your information in the tabs above.</p>
            </div>
        </div>
    );
};