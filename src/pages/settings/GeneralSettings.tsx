
import React from 'react';
import { Save, RotateCcw, Globe, Palette, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const GeneralSettings: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure global application branding, security and localization.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader title="Appearance & Branding" subtitle="Define the identity of your platform." />
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Platform Name</label>
                <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none" defaultValue="Nexus Admin" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Contact Email</label>
                <input type="email" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none" defaultValue="admin@nexus-corp.com" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette size={18} className="text-primary-600" />
                <label className="text-sm font-bold text-slate-900 dark:text-white">Brand Accent Color</label>
              </div>
              <div className="flex flex-wrap gap-4">
                 {['#0ea5e9', '#6366f1', '#8b5cf6', '#10b981', '#f43f5e', '#f59e0b'].map(color => (
                   <button 
                    key={color} 
                    className={`w-10 h-10 rounded-xl border-4 transition-all hover:scale-110 shadow-sm ${color === '#0ea5e9' ? 'border-primary-200 scale-110' : 'border-transparent'}`} 
                    style={{ backgroundColor: color }}
                   ></button>
                 ))}
                 <button className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold hover:border-primary-400 transition-colors">
                   +
                 </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader title="Localization" subtitle="Regional preferences for your team." />
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-primary-600" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Regional Options</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">Default Language</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none appearance-none">
                    <option>English (United States)</option>
                    <option>Spanish (ES)</option>
                    <option>German (DE)</option>
                    <option>Japanese (JP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2">Primary Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none appearance-none">
                    <option>(UTC-08:00) Pacific Time</option>
                    <option>(UTC+00:00) Greenwich Mean Time</option>
                    <option>(UTC+09:00) Tokyo</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Security & Access" subtitle="Manage global security protocols." />
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary-600" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Access Policy</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Two-Factor Authentication (2FA)', active: true },
                    { label: 'Session Persistence (30 days)', active: false },
                    { label: 'IP White-listing', active: false },
                  ].map(policy => (
                    <label key={policy.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{policy.label}</span>
                      <div className={`w-10 h-5 rounded-full p-1 transition-colors ${policy.active ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${policy.active ? 'translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" className="gap-2">
          <RotateCcw size={16} /> Discard Changes
        </Button>
        <Button className="gap-2 shadow-lg shadow-primary-500/20">
          <Save size={16} /> Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
