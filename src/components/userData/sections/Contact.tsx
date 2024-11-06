import { Button, Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useUser } from "../../../hooks/useUser";

export default function Contact() {
    const [update, setUpdate] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        title: "",
        position: "",
        email: "",
        phone: "",
        address: "",
        linkedIn: "",
        github: "",
        website: ""
    });
    const { user } = useUser();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLSelectElement>(null);
    const positionRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const linkedInRef = useRef<HTMLInputElement>(null);
    const githubRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            if (!user?.uid) return;
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setContactInfo(userDoc.data().contactInfo || {});
            }
        };
        fetchContactInfo();
    }, [user]);

    const triggerUpdate = () => setUpdate(!update);

    const handleSaveContactInfo = async () => {
        if (!user?.uid) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const updatedContactInfo = {
                firstName: firstNameRef.current?.value || "",
                lastName: lastNameRef.current?.value || "",
                title: titleRef.current?.value || "",
                position: positionRef.current?.value || "",
                email: emailRef.current?.value || "",
                phone: phoneRef.current?.value || "",
                address: addressRef.current?.value || "",
                linkedIn: linkedInRef.current?.value || "",
                github: githubRef.current?.value || "",
                website: websiteRef.current?.value || ""
            };

            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                contactInfo: updatedContactInfo
            }, { merge: true });

            setContactInfo(updatedContactInfo);
            triggerUpdate();
        } catch (error) {
            console.error("Error saving contact info: ", error);
        }
    };

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Contact Information</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex gap-4">
                            <h4 className="text-lg font-medium">{contactInfo.title} {contactInfo.firstName} {contactInfo.lastName}</h4>
                            <p className="text-lg text-gray-500">{contactInfo.position}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Email:</p>
                                <p className="text-md">{contactInfo.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Phone:</p>
                                <p className="text-md">{contactInfo.phone}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Address:</p>
                                <p className="text-md">{contactInfo.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">LinkedIn:</p>
                                <p className="text-md">{contactInfo.linkedIn}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Github:</p>
                                <p className="text-md">{contactInfo.github}</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-md font-medium text-gray-500">Website:</p>
                                <p className="text-md">{contactInfo.website}</p>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                ref={firstNameRef}
                                label="First Name"
                                labelPlacement="outside"
                                placeholder="First Name"
                                type="text"
                                defaultValue={contactInfo.firstName}
                            />
                            <Input
                                ref={lastNameRef}
                                label="Last Name"
                                labelPlacement="outside"
                                placeholder="Last Name"
                                type="text"
                                defaultValue={contactInfo.lastName}
                            />
                            <Select
                                ref={titleRef}
                                label="Title"
                                labelPlacement="outside"
                                placeholder=""
                                value={contactInfo.title}
                                onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
                            >
                                <SelectItem key='Dr'>Dr</SelectItem>
                                <SelectItem key='Mr'>Mr</SelectItem>
                                <SelectItem key='Mrs'>Mrs</SelectItem>
                                <SelectItem key='Ms'>Ms</SelectItem>
                                <SelectItem key='Miss'>Miss</SelectItem>
                                <SelectItem key='Prof'>Prof</SelectItem>
                            </Select>
                            <Input
                                ref={positionRef}
                                label="Position"
                                labelPlacement="outside"
                                placeholder="Position"
                                type="text"
                                defaultValue={contactInfo.position}
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                ref={emailRef}
                                label="Email"
                                labelPlacement="outside"
                                placeholder="Email"
                                type="email"
                                defaultValue={contactInfo.email}
                            />
                            <Input
                                ref={phoneRef}
                                label="Phone"
                                labelPlacement="outside"
                                placeholder="Phone"
                                type="tel"
                                defaultValue={contactInfo.phone}
                            />
                            <Input
                                ref={addressRef}
                                label="Address"
                                labelPlacement="outside"
                                placeholder="Address"
                                type="text"
                                defaultValue={contactInfo.address}
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                ref={linkedInRef}
                                label="LinkedIn"
                                labelPlacement="outside"
                                placeholder="LinkedIn"
                                type="text"
                                defaultValue={contactInfo.linkedIn}
                            />
                            <Input
                                ref={githubRef}
                                label="Github"
                                labelPlacement="outside"
                                placeholder="Github"
                                type="text"
                                defaultValue={contactInfo.github}
                            />
                            <Input
                                ref={websiteRef}
                                label="Website"
                                labelPlacement="outside"
                                placeholder="Website"
                                type="text"
                                defaultValue={contactInfo.website}
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <Button className="mt-4 mr-2" onClick={handleSaveContactInfo}>
                                Save
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
        </div>
    );
};
