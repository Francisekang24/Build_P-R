import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Language as LanguageType } from "../../../types/UserData";

export default function Language() {
    const [update, setUpdate] = useState(false);
    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const { user } = useUser();
    const languageRef = useRef<HTMLInputElement>(null);
    const proficiencyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setLanguages(userDoc.data().languages || []);
            }
        };
        fetchLanguages();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleAddLanguage = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const language: LanguageType = {
                name: languageRef.current?.value || "",
                level: proficiencyRef.current?.value || "",
            };

            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingLanguages = userDoc.exists() ? userDoc.data().languages || [] : [];

            await setDoc(userDocRef, {
                languages: [...existingLanguages, language]
            }, { merge: true });

            setLanguages([...existingLanguages, language]);
            triggerUpdate();
            if (languageRef.current) languageRef.current.value = "";
            if (proficiencyRef.current) proficiencyRef.current.value = "";
        } catch (error) {
            console.error("Error adding language: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Languages</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            {languages.map((language, index) => (
                                <div key={index} className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Language</p>
                                        <p className="text-sm">{language.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Proficiency</p>
                                        <p className="text-sm">{language.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <form>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    ref={languageRef}
                                    label="Language"
                                    labelPlacement="outside"
                                    placeholder="Language"
                                    type="text"
                                />
                                <Input
                                    ref={proficiencyRef}
                                    label="Proficiency"
                                    labelPlacement="outside"
                                    placeholder="Proficiency"
                                    type="text"
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <Button className="mt-4 mr-2" onClick={handleAddLanguage}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-end items-center">
                        <Button
                            onClick={triggerUpdate}
                            className="mr-2"
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};