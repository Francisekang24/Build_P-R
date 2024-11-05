import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";



export default function Skills() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

    return (
        <div className="max-w-full">
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Skills</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div  className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm">JavaScript</p>
                                    <p className="text-sm">Advanced</p>
                                </div>
                                <div>
                                    <p className="text-sm">React</p>
                                    <p className="text-sm">Intermediate</p>
                                </div>
                                <div>
                                    <p className="text-sm">TypeScript</p>
                                    <p className="text-sm">Beginner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Skill"
                                labelPlacement="outside"
                                placeholder="Skill"
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
                            size="sm"
                            onClick={triggerUpdate}
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>

    );
}