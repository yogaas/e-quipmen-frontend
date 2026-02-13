
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  User, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../features/auth/authSlice';
import type { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';

interface TopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    console.log("AAA")
    await dispatch(logoutAsync());
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 lg:hidden">
          <Menu size={20} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-64 md:w-80">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm w-full dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleDarkMode} 
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block"></div>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
              JD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold dark:text-white leading-none">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Administrator</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
              <a href="#/settings/user" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                <User size={16} /> Profile
              </a>
              <a href="#/settings/general" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                <SettingsIcon size={16} /> Settings
              </a>
              <hr className="my-1 border-slate-200 dark:border-slate-800" />
              <button onClick={() => handleLogout()} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 w-full text-left hover:bg-red-50 dark:hover:bg-red-950/20">
                <LogOut size={16}  /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
