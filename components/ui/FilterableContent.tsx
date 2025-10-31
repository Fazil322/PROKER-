import React, { useState, useMemo } from 'react';

interface FilterableContentProps<T> {
    items: T[];
    searchPlaceholder: string;
    searchKeys: (keyof T)[];
    filterOptions?: {
        key: keyof T;
        label: string;
    };
    renderItem: (item: T, index: number) => React.ReactNode;
    gridClasses?: string;
    initialVisibleCount?: number;
}

const FilterableContent = <T extends { id: number }>({
    items,
    searchPlaceholder,
    searchKeys,
    filterOptions,
    renderItem,
    gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    initialVisibleCount,
}: FilterableContentProps<T>) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterValue, setFilterValue] = useState('all');
    const [visibleCount, setVisibleCount] = useState(initialVisibleCount || items.length);

    const filterCategories = useMemo(() => {
        if (!filterOptions) return [];
        return ['all', ...Array.from(new Set(items.map(item => String(item[filterOptions.key]))))];
    }, [items, filterOptions]);
    
    const filteredItems = useMemo(() => {
        return items
            .filter(item => {
                if (filterOptions && filterValue !== 'all') {
                    return String(item[filterOptions.key]) === filterValue;
                }
                return true;
            })
            .filter(item => {
                if (!searchTerm) return true;
                return searchKeys.some(key =>
                    String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
    }, [items, searchTerm, filterValue, searchKeys, filterOptions]);
    
    const showLoadMore = initialVisibleCount && visibleCount < filteredItems.length;

    return (
        <div>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                </div>
                {filterOptions && filterCategories.length > 2 && (
                    <div className="md:col-span-2">
                        <select
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                            <option value="all">Semua {filterOptions.label}</option>
                            {filterCategories.slice(1).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            
            {filteredItems.length > 0 ? (
                <div className={gridClasses}>
                    {filteredItems.slice(0, visibleCount).map(renderItem)}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-lg text-gray-500 dark:text-gray-400">Tidak ada hasil yang ditemukan.</p>
                </div>
            )}
            
            {showLoadMore && (
                <div className="text-center mt-12">
                    <button
                        onClick={() => setVisibleCount(prev => prev + initialVisibleCount)}
                        className="btn-animated bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold py-3 px-8 rounded-full"
                    >
                        Tampilkan Lebih Banyak
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterableContent;