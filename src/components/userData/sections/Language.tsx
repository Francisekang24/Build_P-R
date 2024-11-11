import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";
import { Language as LanguageType } from "../../../types/UserData";

export default function Language() {
    const [update, setUpdate] = useState(false);
    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const [newLanguage, setNewLanguage] = useState<LanguageType>({ name: "", level: "" });
    const { user, UpdateLanguages } = useUser();

    useEffect(() => {
        const fetchLanguages = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const fetchedLanguages = userDoc.data().languages || [];
                setLanguages(fetchedLanguages);
                UpdateLanguages(fetchedLanguages); // Only update context after fetching
            }
        };
        fetchLanguages();
    }, [user, UpdateLanguages]);

    const triggerUpdate = () => setUpdate(!update);

    const handleInputChange = (field: keyof LanguageType, value: string) => {
        setNewLanguage((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddLanguage = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            const existingLanguages = userDoc.exists() ? userDoc.data().languages || [] : [];

            const updatedLanguages = [...existingLanguages, newLanguage];

            await setDoc(userDocRef, { languages: updatedLanguages }, { merge: true });

            setLanguages(updatedLanguages);
            UpdateLanguages(updatedLanguages); // Update context with the new languages array
            setNewLanguage({ name: "", level: "" }); // Clear new language input fields
            triggerUpdate();
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
                        <form onSubmit={(e) => { e.preventDefault(); handleAddLanguage(); }}>
                            <div className="flex gap-2 p-1 w-full">
                                <Input
                                    label="Language"
                                    labelPlacement="outside"
                                    placeholder="Language"
                                    type="text"
                                    value={newLanguage.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                                <Input
                                    label="Proficiency"
                                    labelPlacement="outside"
                                    placeholder="Proficiency"
                                    type="text"
                                    value={newLanguage.level}
                                    onChange={(e) => handleInputChange("level", e.target.value)}
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
                        <Button onClick={triggerUpdate} className="mr-2">
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <pre>{JSON.stringify(languages, null, 2)}</pre>
        </div>
    );
};
