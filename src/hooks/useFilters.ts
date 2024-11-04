

import { useState } from "react";

interface Filters {
    tag: string;
    theme: string;
    major: string;
    style: string;
  }
  
  export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>({
      tag: '',
      theme: '',
      major: '',
      style: '',
    });
  
    const setFilter = (key: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };
  
    return { filters, setFilter };
  };