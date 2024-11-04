import { useMemo } from 'react';
import Filter from '../components/Filter';
import { useFilters } from '../hooks/useFilters';
import PortfolioList from '../components/Portolio/PorfolioList';
import { ScrollShadow } from "@nextui-org/react";

import { portfolioTemplates } from '../data/data';


export default function Portfolio() {
    const { filters, setFilter } = useFilters();

    const uniqueTags = useMemo(() =>
        Array.from(new Set(portfolioTemplates.flatMap((template) => template.tags))),
        []
    );

    const uniqueThemes = useMemo(() =>
        Array.from(new Set(portfolioTemplates.flatMap((template) => template.themes))),
        []
    );

    const uniqueMajors = useMemo(() =>
        Array.from(new Set(portfolioTemplates.map((template) => template.major))),
        []
    );

    const uniqueStyles = useMemo(() =>
        Array.from(new Set(portfolioTemplates.flatMap((template) => template.styles))),
        []
    );

    const filteredTemplates = useMemo(() =>
        portfolioTemplates.filter((template) =>
            (filters.tag ? template.tags.includes(filters.tag) : true) &&
            (filters.theme ? template.themes.includes(filters.theme) : true) &&
            (filters.major ? template.major === filters.major : true) &&
            (filters.style ? template.styles.includes(filters.style) : true)
        ),
        [filters]
    );

    return (
        <div className="max-w-5xl mx-auto p-6 bg-slate-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Portfolio Templates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Filter
                    label="tag"
                    options={uniqueTags}
                    value={filters.tag}
                    onChange={(value) => setFilter('tag', value)}
                />
                <Filter
                    label="theme"
                    options={uniqueThemes}
                    value={filters.theme}
                    onChange={(value) => setFilter('theme', value)}
                />
                <Filter
                    label="major"
                    options={uniqueMajors}
                    value={filters.major}
                    onChange={(value) => setFilter('major', value)}
                />
                <Filter
                    label="style"
                    options={uniqueStyles}
                    value={filters.style}
                    onChange={(value) => setFilter('style', value)}
                />
            </div>
            <ScrollShadow hideScrollBar className="w-full h-[400px]">
                <PortfolioList templates={filteredTemplates} />
            </ScrollShadow>
        </div>
    );
};