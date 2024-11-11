import { Button, Card, CardBody, CardFooter, CardHeader, Textarea } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";

export default function Summary() {
    const [update, setUpdate] = useState(false);
    const [summary, setSummary] = useState("");
    const { user, UpdateSummary } = useUser();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setSummary(userDoc.data().summary || "");
            }
        };
        fetchSummary();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);
    UpdateSummary(summary);

    const handleAddSummary = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const newSummary = textareaRef.current?.value || "";

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { summary: newSummary }, { merge: true });
            setSummary(newSummary);
            triggerUpdate();
            if (textareaRef.current) {
                textareaRef.current.value = "";
            }
        } catch (error) {
            console.error("Error adding summary: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Summary</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Summary</p>
                                    <p className="text-sm">{summary}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Textarea
                                ref={textareaRef}
                                label="Summary"
                                labelPlacement="outside"
                                placeholder="Summary"
                                type="text"
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <Button className="mt-4 mr-2" onClick={handleAddSummary}>
                                Update
                            </Button>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button
                        onClick={triggerUpdate}
                    >
                        {update ? "Done" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
            <pre className="w-40">
                {JSON.stringify(summary, null, 2)}
            </pre>
        </div>
    );
};