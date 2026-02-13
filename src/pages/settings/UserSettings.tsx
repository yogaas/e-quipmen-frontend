
import React from 'react';
import { User, Camera, Lock, Bell, Shield, Save, RotateCcw, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const UserSettings: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update your personal information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold bg-primary-50 text-primary-600 dark:bg-primary-950/20 rounded-xl transition-all">
            <User size={18} /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
            <Lock size={18} /> Password
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all">
            <Shield size={18} /> Security
          </button>
        </aside>

        <div className="md:col-span-9 space-y-6">
          <Card>
            <CardHeader title="General Information" subtitle="This information will be displayed on your profile." />
            <CardContent className="space-y-8">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-3xl text-slate-300 border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:border-primary-400 transition-all">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-slate-700 text-primary-600 rounded-xl shadow-xl border border-slate-100 dark:border-slate-600 hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                  <p className="text-xs text-slate-500 mt-1">Recommended size: 400x400px. JPG, PNG.</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">Change</Button>
                    <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none" defaultValue="John" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none" defaultValue="Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Work Email Address</label>
                  <input type="email" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none" defaultValue="john.doe@nexus.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Brief Biography</label>
                  <textarea rows={4} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none resize-none" placeholder="Share a little about yourself..." />
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <Button variant="outline" className="gap-2">
                  <RotateCcw size={16} /> Discard
                </Button>
                <Button className="gap-2 shadow-lg shadow-primary-500/20">
                  <Save size={16} /> Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-100 dark:border-rose-900/30">
            <CardHeader title="Danger Zone" />
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="max-w-md">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Delete your account</p>
                  <p className="text-xs text-slate-500 mt-1">Once you delete your account, all data will be permanently removed. This action is irreversible.</p>
                </div>
                <Button variant="danger" className="gap-2">
                  <Trash2 size={16} /> Deactivate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
