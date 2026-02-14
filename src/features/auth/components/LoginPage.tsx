
import React, { useState, useEffect } from 'react';
import {  useNavigate , Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck, Github } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearError } from '../authSlice';
import type { AppDispatch, RootState } from '../../../app/store';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, access_token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (access_token) {
      navigate('/dashboard', { replace: true });
    }
  }, [access_token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginAsync({ email, password }));

    if (loginAsync.fulfilled.match(result)) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Left Side: Branding/Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-2xl mb-8">N</div>
            <h1 className="text-4xl font-black leading-tight">Empowering Your Equipment Management.</h1>
            <p className="mt-4 text-primary-100 font-medium">Nexus provides high-performance tools for modern cashiering and inventory tracking.</p>
          </div>
          
          <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
              <ShieldCheck className="text-primary-900" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Secure Access</p>
              <p className="text-xs text-primary-100">Enterprise-grade encryption enabled.</p>
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary-700 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-rose-600 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 rounded-2xl bg-primary-600 shadow-xl shadow-primary-500/20 gap-2 font-bold"
              isLoading={isLoading}
            >
              <LogIn size={18} /> Sign In to Account
            </Button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
            <span className="text-[10px] font-black uppercase text-slate-400">Or Continue With</span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
               <Github size={18} /> Github
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all">
               <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
