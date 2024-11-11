import { cn, Switch } from "@nextui-org/react";
import { useState } from "react";

export function IntroductionPanel() {
    const [option, setOption] = useState(0);
    return (
        <div className="flex gap-2">
            <Switch
                isSelected={option === 1}
                onChange={() => setOption(option === 1 ? 0 : 1)}
                classNames={{
                    base: cn(
                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary",
                    ),
                    wrapper: "hidden",
                    thumb: cn("hidden"),
                }}
            >
                <div className="flex flex-col gap-1">
                    <p className="text-medium">Option 1</p>
                </div>
            </Switch>
            <Switch
                isSelected={option === 2}
                onChange={() => setOption(option === 2 ? 0 : 2)}
                classNames={{
                    base: cn(
                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary",
                    ),
                    wrapper: "hidden",
                    thumb: cn("hidden"),
                }}
            >
                <div className="flex flex-col gap-1">
                    <p className="text-medium">Option 2</p>
                </div>
            </Switch>
        </div>
    );
}

export default IntroductionPanel;