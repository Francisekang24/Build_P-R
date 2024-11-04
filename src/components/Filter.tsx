
import { Select, SelectItem } from "@nextui-org/react";

interface FilterProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export default function Filter({ label, options, value, onChange }: FilterProps) {

    return (
        <div className="mb-4">
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={label}
                className="max-w-xs"
            >
                <SelectItem key="" value="">
                    All {label}
                </SelectItem>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                )) as any}
            </Select>
        </div>
    );
};