import {Link, useLocation} from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export const SidebarLink = ({item}) => {
    const location = useLocation();
    const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Circle;
    const isActive = location.pathname.startsWith(item.to_path);

    return (
        <div className="mb-1">
            <Link
                to={item.to_path}
                className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition ${
                    isActive ? 'bg-muted font-semibold' : ''
                }`}
            >
                <IconComponent size={18}/>
                <span className="text-sm">{item.label}</span>
            </Link>

            {item.children?.length > 0 && (
                <div className="ml-4 mt-1 space-y-1">
                    {item.children.map(child => {
                        const isChildActive = location.pathname.startsWith(child.to_path);
                        return (
                            <Link
                                key={child.id}
                                to={child.to_path}
                                className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-muted transition ${
                                    isChildActive ? 'bg-muted font-medium' : ''
                                }`}
                            >
                                <LucideIcons.ChevronRight size={14}/>
                                <span className="text-sm">{child.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
