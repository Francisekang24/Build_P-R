
import { ResumeType } from '../../types';
import ResumeTemplate from './ResumeTemplate';
interface ResumeListProps {
    templates: ResumeType[];
}

export default function ResumeList({ templates }: ResumeListProps) {

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {templates.map((template) => (
                <ResumeTemplate key={template.id} resume={template} />
            ))}
        </div>
    );
}