

import React from 'react';
import { useData } from '../../context/DataContext.tsx';
import AdminEditButton from './AdminEditButton.tsx';
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