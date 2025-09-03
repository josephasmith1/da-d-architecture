'use client';

import { Tabs, Tab, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export function ProjectFilters({ onFilterChange, onSortChange }: { onFilterChange: (category: string) => void; onSortChange: (sort: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");
  
  const categories = [
    { key: "all", label: "All" },
    { key: "residential", label: "Residential" },
    { key: "commercial", label: "Commercial" },
    { key: "landscape", label: "Landscape" },
    { key: "interior", label: "Interior" }
  ];
  
  const sortOptions = [
    { key: "recent", label: "Recent" },
    { key: "az", label: "A-Z" },
    { key: "category", label: "Category" }
  ];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };
  
  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between gap-4">
      <Tabs 
        aria-label="Project categories" 
        selectedKey={selectedCategory}
        onSelectionChange={(key) => handleCategoryChange(key as string)}
      >
        {categories.map((category) => (
          <Tab key={category.key} title={category.label} />
        ))}
      </Tabs>
      
      <Select 
        label="Sort by"
        className="max-w-xs"
        selectedKeys={[selectedSort]}
        onSelectionChange={(keys) => handleSortChange(Array.from(keys)[0] as string)}
      >
        {sortOptions.map((option) => (
          <SelectItem key={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
