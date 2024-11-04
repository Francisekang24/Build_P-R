import { PortfolioType } from '../../types';
import PortfolioTemplate from './PortfolioTemplate';

interface PortfolioListProps {
    templates: PortfolioType[];
}

export default function PortfolioList({ templates }: PortfolioListProps) {

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {templates.map((template) => (
                <PortfolioTemplate key={template.id} portfolio={template} />
            ))}
        </div>
    );
}