
import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Smartphone, Laptop, Tablet, Watch } from 'lucide-react';

const Widgets: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">UI Widgets</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-primary-600 border-none">
          <CardContent className="p-6 text-white">
            <h5 className="text-white/70 text-sm font-medium">Monthly Goals</h5>
            <h2 className="text-3xl font-bold mt-1">$120,430</h2>
            <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full">
              <div className="h-full w-3/4 bg-white rounded-full"></div>
            </div>
            <p className="text-xs mt-2 text-white/80">75% of your target achieved</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-600 border-none">
          <CardContent className="p-6 text-white">
            <h5 className="text-white/70 text-sm font-medium">Customer Satisfaction</h5>
            <h2 className="text-3xl font-bold mt-1">98.2%</h2>
            <div className="flex items-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-4 bg-white rounded-sm opacity-100"></div>)}
              {[1, 2].map(i => <div key={i} className="w-2 h-4 bg-white/30 rounded-sm"></div>)}
            </div>
            <p className="text-xs mt-2 text-white/80">Based on 1,450 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-slate-500 text-sm font-semibold uppercase">Device Analytics</h5>
              <div className="text-emerald-500 text-xs font-bold">+12%</div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Mobile', value: 45, icon: <Smartphone size={14} />, color: 'bg-blue-500' },
                { label: 'Desktop', value: 30, icon: <Laptop size={14} />, color: 'bg-purple-500' },
                { label: 'Tablet', value: 25, icon: <Tablet size={14} />, color: 'bg-emerald-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      {item.icon} {item.label}
                    </span>
                    <span className="text-xs font-bold dark:text-white">{item.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
             <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-950/30 flex items-center justify-center mx-auto mb-4">
                <Watch className="text-primary-600" size={32} />
             </div>
             <h4 className="font-bold dark:text-white">Active Sessions</h4>
             <p className="text-2xl font-black text-primary-600 mt-1">452</p>
             <p className="text-xs text-slate-400 mt-2">Currently browsing the site</p>
             <Button variant="outline" size="sm" className="w-full mt-4">View Report</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
           <CardHeader title="Latest Activity" />
           <CardContent className="space-y-6">
             {[
               { user: 'Sarah Connor', action: 'purchased Premium Plan', time: '2m ago' },
               { user: 'John Reese', action: 'updated profile picture', time: '45m ago' },
               { user: 'Root Admin', action: 'deleted 5 inactive users', time: '1h ago' },
               { user: 'Harold Finch', action: 'created new project', time: '3h ago' },
             ].map((a, i) => (
               <div key={i} className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center font-bold text-xs">
                   {a.user.charAt(0)}
                 </div>
                 <div className="min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-bold">{a.user}</span> {a.action}
                    </p>
                    <span className="text-[10px] text-slate-400">{a.time}</span>
                 </div>
               </div>
             ))}
           </CardContent>
        </Card>

        <Card className="md:col-span-2">
           <CardHeader title="System Status" />
           <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'API Gateway', status: 'Operational', color: 'text-emerald-500' },
                  { label: 'Database Cluster', status: 'Healthy', color: 'text-emerald-500' },
                  { label: 'Cloud Storage', status: 'Operational', color: 'text-emerald-500' },
                  { label: 'Payment API', status: 'Operational', color: 'text-emerald-500' },
                  { label: 'Redis Cache', status: 'Latency Detected', color: 'text-orange-500' },
                  { label: 'Worker Nodes', status: 'Scaling', color: 'text-blue-500' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-slate-300">{s.label}</span>
                    <span className={`text-xs font-bold ${s.color}`}>{s.status}</span>
                  </div>
                ))}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Widgets;
