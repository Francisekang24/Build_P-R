import { Button, Divider, Input, Textarea } from "@nextui-org/react";



export default function Project() {


    return (
        <div className="max-w-full">
            <div className="space-y-1">
                <h4 className="text-xl font-medium">Projects</h4>
            </div>
            <Divider className="my-2" />
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

    );
};