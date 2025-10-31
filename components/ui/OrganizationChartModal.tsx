import React from 'react';
import Modal from './Modal.tsx';
import { TeamMember } from '../../types.ts';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    team: TeamMember[];
}

const MemberNode: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div>
        <h4 className="font-bold text-sm">{member.name}</h4>
        <p className="text-xs text-brand-blue-600 dark:text-brand-blue-400">{member.position}</p>
    </div>
);

const OrganizationChartModal: React.FC<Props> = ({ isOpen, onClose, team }) => {
    // A simple hardcoded structure based on common positions
    const chairman = team.find(m => m.position.toLowerCase().includes('ketua'));
    const viceChairman = team.find(m => m.position.toLowerCase().includes('wakil'));
    const secretary = team.find(m => m.position.toLowerCase().includes('sekretaris'));
    const treasurer = team.find(m => m.position.toLowerCase().includes('bendahara'));
    const others = team.filter(m => ![chairman, viceChairman, secretary, treasurer].includes(m));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Struktur Organisasi OSIS">
            <div className="org-chart text-center overflow-x-auto p-4">
                <ul>
                    {chairman && (
                        <li>
                            <MemberNode member={chairman} />
                            <ul>
                                {viceChairman && (
                                     <li><MemberNode member={viceChairman} /></li>
                                )}
                                {secretary && (
                                    <li><MemberNode member={secretary} /></li>
                                )}
                                {treasurer && (
                                    <li><MemberNode member={treasurer} /></li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
                {others.length > 0 && (
                     <div className="mt-8">
                        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Koordinator Seksi Bidang</h3>
                         <ul className="flex flex-wrap justify-center gap-4">
                            {others.map(member => (
                                <li key={member.id} className="!p-0">
                                    <MemberNode member={member} />
                                </li>
                            ))}
                        </ul>
                     </div>
                )}
            </div>
        </Modal>
    );
};

export default OrganizationChartModal;