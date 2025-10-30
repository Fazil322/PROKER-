
import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../../context/DataContext.tsx';
// FIX: Add .tsx extension to file import.
import AdminEditButton from './AdminEditButton.tsx';
// FIX: Add .ts extension to file import.
import { AdminSection } from '../../types.ts';

const AdminControl: React.FC<{ section: string; children: React.ReactNode }> = ({ section, children }) => {
    const { isLoggedIn } = useData();

    if (!isLoggedIn) {
        return <>{children}</>;
    }

    return (
        <div id={section} className="relative group">
            <AdminEditButton section={section as AdminSection} />
            {children}
        </div>
    );
};

export default AdminControl;
