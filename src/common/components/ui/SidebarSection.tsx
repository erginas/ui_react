// src/common/components/SidebarSection.tsx
import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import * as Icons from 'lucide-react';

export const SidebarSection = ({item}) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const Icon = Icons[item.icon_name] || Icons.Circle;

    const isActive = location.pathname.startsWith(item.to_path);

    return (
        <div>
            <button
                onClick={() => setOpen(prev => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200
          ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
            >
        <span className="flex items-center gap-2">
          <Icon size={18}/>
            {item.label}
        </span>
                {item.children?.length > 0 && (
                    <Icons.ChevronRight
                        size={16}
                        className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                    />
                )}
            </button>

            {item.children?.length > 0 && (
                <div className={`pl-6 mt-1 space-y-1 transition-all ${open ? 'block' : 'hidden'}`}>
                    {item.children.map(child => {
                        const isChildActive = location.pathname.startsWith(child.to_path);
                        return (
                            <Link
                                key={child.id}
                                to={child.to_path}
                                className={`flex items-center gap-2 px-2 py-1 rounded transition duration-150
                  ${isChildActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}
                            >
                                <Icons.ChevronRight size={14}/>
                                {child.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};