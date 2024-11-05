import { Button, Divider, Input } from "@nextui-org/react";



export default function Language() {

    return (
        <div className="max-w-full">
            <div className="space-y-1">
                <h4 className="text-xl font-medium">Languages</h4>
            </div>
            <Divider className="my-2" />
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
        
    );
};