import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";



export default function Experience() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

    return (

        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Experience</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div  className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Company</p>
                                    <p className="text-sm">Company</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Position</p>
                                    <p className="text-sm">Position</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Responsibilities</p>
                                    <p className="text-sm">Responsibilities</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p className="text-sm">Start Date</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">End Date</p>
                                    <p className="text-sm">End Date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Company"
                                labelPlacement="outside"
                                placeholder="Company"
                                type="text"
                            />
                            <Input
                                label="Position"
                                labelPlacement="outside"
                                placeholder="Position"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-2 p-1 w-full">
                            <Input
                                label="Responsibilities"
                                labelPlacement="outside"
                                placeholder="responsibility"
                                type="text"
                            />
                            <div className="flex justify-start items-center">
                                <Button >
                                    Add
                                </Button>
                            </div>

                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Start Date"
                                labelPlacement="outside"
                                placeholder="Start Date"
                                type="date"
                            />
                            <Input
                                label="End Date"
                                labelPlacement="outside"
                                placeholder="End Date"
                                type="date"
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