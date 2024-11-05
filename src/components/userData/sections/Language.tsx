import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { useState } from "react";



export default function Language() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Languages</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div  className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Language</p>
                                    <p className="text-sm">English</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Proficiency</p>
                                    <p className="text-sm">Advanced</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Language</p>
                                    <p className="text-sm">Yoruba</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Proficiency</p>
                                    <p className="text-sm">Intermediate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Language"
                                labelPlacement="outside"
                                placeholder="Language"
                                type="text"
                            />
                            <Input
                                label="Proficiency"
                                labelPlacement="outside"
                                placeholder="Proficiency"
                                type="text"
                            />
                        </div>
                        <div className="flex justify-end items-center">
                            <Button className="mt-4 mr-2">
                                Add
                            </Button>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-end items-center">
                        <Button
                            onClick={triggerUpdate}
                            className=" mr-2"
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </div>

    );
};