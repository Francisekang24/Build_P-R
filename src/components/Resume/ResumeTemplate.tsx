
import { ResumeType } from "../../types";
import {Card, CardHeader, CardFooter, Image, Button, Chip} from "@nextui-org/react";

interface ResumeTemplateProps {
    resume: ResumeType;
}

export default function ResumeTemplate({ resume }: ResumeTemplateProps) {

    return (
        <Card isFooterBlurred className="w-[300px] h-[300px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">{resume.major}</p>
            <h4 className="text-white/90 font-medium text-xl">{resume.name}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt={`${resume.name} preview`}
                className="z-0 w-full h-full object-cover"
                src={resume.preview}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-wrap gap-2">
                <div className="flex gap-2">
                    {resume.tags.map(tag => (
                        <Chip key={tag} color="primary" size="sm">{tag}</Chip>
                    ))}
                </div>
                <div className="flex gap-2">
                    {resume.themes.map(theme => (
                        <Chip key={theme} color="primary" size="sm">{theme}</Chip>
                    ))}
                </div>
                <div className="flex gap-2">
                    {resume.styles.map(style => (
                        <Chip key={style} color="primary" size="sm">{style}</Chip>
                    ))}
                </div>
                </div>
                <Button radius="full" size="sm">Get</Button>
            </CardFooter>
        </Card>
    );
};
