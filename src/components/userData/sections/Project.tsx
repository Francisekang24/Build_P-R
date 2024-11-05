import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";



export default function Project() {

    const [update, setUpdate] = useState(false);
    const triggerUpdate = () => setUpdate(!update);

    return (
        <div className="max-w-full">
            <Card className="p-4">
                <CardHeader>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium">Projects</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className={update ? "hidden" : "block"}>
                        <div className="flex flex-col gap-2 p-1 w-full ">
                            <div className="border-b pb-2">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Project Name</p>
                                        <p className="text-sm">Weather App</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Link</p>
                                        <p className="text-sm"><a href="https://weatherapp.example.com" target="_blank" rel="noopener noreferrer">weatherapp.example.com</a></p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Technologies</p>
                                        <p className="text-sm">React, TypeScript, OpenWeather API</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Description</p>
                                        <p className="text-sm">A web application that provides weather forecasts and current weather conditions for any location.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b pb-2">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Project Name</p>
                                        <p className="text-sm">Task Manager</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Link</p>
                                        <p className="text-sm"><a href="https://taskmanager.example.com" target="_blank" rel="noopener noreferrer">taskmanager.example.com</a></p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Technologies</p>
                                        <p className="text-sm">Vue, Vuex, Firebase</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Description</p>
                                        <p className="text-sm">A productivity tool to manage tasks, set deadlines, and track progress.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b pb-2">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Project Name</p>
                                        <p className="text-sm">E-commerce Platform</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Link</p>
                                        <p className="text-sm"><a href="https://ecommerce.example.com" target="_blank" rel="noopener noreferrer">ecommerce.example.com</a></p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Technologies</p>
                                        <p className="text-sm">Angular, Node.js, MongoDB</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Description</p>
                                        <p className="text-sm">An online platform for buying and selling products with integrated payment gateway.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={update ? "block" : "hidden"}>
                        <div className="flex gap-2 p-1 w-full">
                            <Input
                                label="Project Name"
                                labelPlacement="outside"
                                placeholder="Project Name"
                                type="text"
                            />
                            <Input
                                label="Link"
                                labelPlacement="outside"
                                placeholder="Link"
                                type="text"
                            />
                        </div>
                        <div className="flex gap-2 p-1 w-full">
                            <Textarea
                                label="Description"
                                labelPlacement="outside"
                                placeholder="Description"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col p-1 w-full">
                            <Input
                                label="Technologies"
                                labelPlacement="outside"
                                placeholder="Technologies"
                                type="text"
                            />
                            <div className="flex justify-start items-center">
                                <Button className="mt-4 mr-2">
                                    Add
                                </Button>
                            </div>
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
                        >
                            {update ? "Done" : "Update"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>

    );
};