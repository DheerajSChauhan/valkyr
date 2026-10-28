import React, { useEffect, useState, useRef } from 'react';
import { useFitness } from '../context/FitnessContext';
import { GlassCard } from '../components/common/GlassCard';
import { pbClient } from '../lib/pocketbase';
import {
  Scale,
  Target,
  Download,
  Upload,
  Copy,
  Trash2,
  Utensils,
  ChevronRight,
  Shield,
  Sparkles,
  Cloud,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    toggleUnit,
    setCurrentScreen,
    workoutSummaries,
    scheduleDays,
    nutrition,
    recovery,
    workouts,
    communityPosts,
    pbOnline,
    pbQueueCount,
    pbStatusMessage,
    triggerCloudSync,
    importBackupData,
    showToast
  } = useFitness();

  const [name, setName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle || '@alex_valkyr');
  const [goal, setGoal] = useState(userProfile.currentGoal);
  const [pbUrl, setPbUrl] = useState(pbClient.getBaseUrl());
  const [pbEmail, setPbEmail] = useState('');
  const [pbPassword, setPbPassword] = useState('');
  const [pbPasswordConfirm, setPbPasswordConfirm] = useState('');
  const [pbName, setPbName] = useState(userProfile.name);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(pbClient.isAuthenticated());
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return pbClient.authStore.onChange(() => {
      setIsAuthenticated(pbClient.isAuthenticated());
    });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, handle, currentGoal: goal });
    showToast('Profile preferences saved');
  };

  // Fixes Bug #6: Exports COMPLETE application state (profile, workouts, logs, schedule, nutrition, recovery, community)
  const handleExportBackup = () => {
    const backupData = {
      version: '2.0.0-pocketbase',
      exportedAt: new Date().toISOString(),
      profile: userProfile,
      workoutSummaries,
      scheduleDays,
      nutrition,
      recovery,
      workouts,
      communityPosts
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valkyr_full_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Full backup (.json) downloaded!');
  };

  // Fixes Bug #6: Restores complete backup from JSON file
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const content = String(ev.target?.result || '');
      importBackupData(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCopyBackup = async () => {
    const fullBackup = {
      profile: userProfile,
      workoutSummaries,
      scheduleDays,
      nutrition,
      recovery
    };
    const dataStr = JSON.stringify(fullBackup, null, 2);
    try {
      await navigator.clipboard.writeText(dataStr);
      showToast('Full backup JSON copied to clipboard!');
    } catch {
      showToast('Backup ready');
    }
  };

  const handleSavePbUrl = () => {
    try {
      pbClient.setBaseUrl(pbUrl);
      triggerCloudSync();
      showToast('PocketBase URL saved');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Invalid PocketBase URL');
    }
  };

  const handlePbLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pbEmail || !pbPassword) return;
    if (isRegistering && pbPassword !== pbPasswordConfirm) {
      showToast('⚠️ Passwords do not match');
      return;
    }
    const res = isRegistering
      ? await pbClient.registerWithPassword(pbEmail, pbPassword, pbPasswordConfirm, pbName)
      : await pbClient.loginWithPassword(pbEmail, pbPassword);
    if (res.ok) {
      pbClient.reassignQueuedOwnership(pbClient.getAuthenticatedUser()?.id);
      showToast(isRegistering ? '✅ Account created and signed in!' : '✅ Authenticated with PocketBase!');
      setPbPassword('');
      setPbPasswordConfirm('');
      triggerCloudSync();
    } else {
      showToast(`⚠️ ${res.error}`);
    }
  };

  const handleGoogleLogin = async () => {
    const res = await pbClient.loginWithGoogle();
    if (res.ok) {
      setIsAuthenticated(true);
      showToast('✅ Google account connected!');
      triggerCloudSync();
    } else {
      showToast(`⚠️ ${res.error}`);
    }
  };

  const handlePbLogout = () => {
    pbClient.logout();
    showToast('Signed out of PocketBase');
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Profile Header Card */}
      <GlassCard variant="elevated" className="p-5 flex items-center gap-4">
        <div className="relative">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#C7FF3D] shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#101112] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#C7FF3D]" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30">
              {userProfile.experience}
            </span>
            <span className="text-[10px] text-[#929895] font-bold">
              {userProfile.handle || '@alex_valkyr'}
            </span>
          </div>
          <h2 className="text-lg font-black text-white truncate mt-1">{userProfile.name}</h2>
          <p className="text-xs text-[#929895] truncate">{userProfile.currentGoal}</p>
        </div>
      </GlassCard>

      {/* Quick Navigation to Nutrition & Recovery */}
      <button
        type="button"
        onClick={() => setCurrentScreen('nutrition')}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1C1F20] to-[#151718] border border-white/10 hover:border-[#C7FF3D]/50 flex items-center justify-between text-left transition group shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center text-[#C7FF3D]">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white group-hover:text-[#C7FF3D] transition">
              Nutrition & Recovery Hub
            </h4>
            <p className="text-xs text-[#929895]">Track macros, hydration, sleep & readiness</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#929895] group-hover:text-white group-hover:translate-x-1 transition" />
      </button>

      {/* POCKETBASE CLOUD SYNC & MULTI-USER AUTH */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#C7FF3D]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-[#929895]">
              POCKETBASE BACKEND & OFFLINE GYM SYNC
            </h3>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              pbOnline
                ? 'bg-[#C7FF3D]/15 text-[#C7FF3D]'
                : 'bg-[#FF9A58]/15 text-[#FF9A58]'
            }`}
          >
            {pbOnline ? 'Connected' : `Offline Queue (${pbQueueCount} pending)`}
          </span>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5 space-y-4">
          <div className="p-3 rounded-xl bg-[#151718] border border-white/[0.06] text-xs text-[#929895] flex items-center justify-between gap-2">
            <span>{pbStatusMessage}</span>
            <button
              type="button"
              onClick={triggerCloudSync}
              className="btn-glass-subtle px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#C7FF3D] flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync Now</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#929895] block">
              PocketBase Server URL (import <code className="text-[#C7FF3D]">pb_schema.json</code> in Admin UI)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pbUrl}
                onChange={e => setPbUrl(e.target.value)}
                placeholder="http://127.0.0.1:8090"
                className="flex-1 bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
              <button
                type="button"
                onClick={handleSavePbUrl}
                className="btn-electric-lime px-3.5 py-2 rounded-xl text-xs font-black"
              >
                Connect
              </button>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">Cloud account connected</p>
                <p className="text-[11px] text-[#929895] truncate">{pbClient.getAuthenticatedUser()?.email}</p>
              </div>
              <button
                type="button"
                onClick={handlePbLogout}
                className="btn-glass-subtle px-3 py-2 rounded-xl text-xs font-bold text-white hover:border-[#FF9A58] shrink-0"
              >
                Sign Out
              </button>
            </div>
          ) : (
          <form onSubmit={handlePbLogin} className="space-y-2 pt-1">
            {isRegistering && (
              <input
                type="text"
                placeholder="Display name (optional)"
                value={pbName}
                onChange={e => setPbName(e.target.value)}
                className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="email"
              required
              placeholder="Email"
              value={pbEmail}
              onChange={e => setPbEmail(e.target.value)}
              className="bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={pbPassword}
              onChange={e => setPbPassword(e.target.value)}
              className="bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
            {isRegistering && (
              <input
                type="password"
                required
                placeholder="Confirm password"
                value={pbPasswordConfirm}
                onChange={e => setPbPasswordConfirm(e.target.value)}
                className="bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            )}
            <button
              type="submit"
              className="btn-glass-subtle py-2 rounded-xl text-xs font-bold text-white hover:border-[#C7FF3D] flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#C7FF3D]" />
              <span>{isRegistering ? 'Create Account' : 'Sign In to Cloud'}</span>
            </button>
            </div>
            <button
              type="button"
              onClick={() => setIsRegistering(value => !value)}
              className="text-[11px] font-bold text-[#C7FF3D] hover:underline"
            >
              {isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full btn-glass-subtle py-2 rounded-xl text-xs font-bold text-white hover:border-[#C7FF3D]"
            >
              Continue with Google
            </button>
          </form>
          )}
        </GlassCard>
      </section>

      {/* UNIT PREFERENCE SETTINGS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Scale className="w-4 h-4 text-[#C7FF3D]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            UNITS & MEASUREMENT
          </h3>
        </div>

        <GlassCard variant="standard" className="p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-white block">Weight & Load Units</span>
            <span className="text-[11px] text-[#929895]">
              Active unit: <strong className="text-[#C7FF3D]">{userProfile.unit.toUpperCase()}</strong> (automatically converts weights, bodyweight & chart axes)
            </span>
          </div>

          <button
            type="button"
            onClick={toggleUnit}
            className="btn-electric-lime px-4 py-2 text-xs font-black shadow-md shadow-[#C7FF3D]/20"
          >
            Convert to {userProfile.unit === 'kg' ? 'LBS' : 'KG'}
          </button>
        </GlassCard>
      </section>

      {/* TRAINING PREFERENCES FORM */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Target className="w-4 h-4 text-[#C7FF3D]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            ATHLETE PROFILE & GOALS
          </h3>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5 space-y-4">
          <form onSubmit={handleSaveProfile} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#929895] block mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#929895] block mb-1">Social Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#929895] block mb-1">Primary Goal</label>
              <select
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              >
                <option value="Hypertrophy & Strength">Hypertrophy & Strength</option>
                <option value="Pure Strength & Powerlifting">Pure Strength & Powerlifting</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                <option value="Athletic Functional Movement">Athletic Functional Movement</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-bold text-[#929895] block mb-1">
                  Weekly Days Target
                </label>
                <input
                  type="number"
                  min="3"
                  max="7"
                  value={userProfile.availableDaysPerWeek}
                  onChange={e =>
                    updateUserProfile({
                      availableDaysPerWeek: parseInt(e.target.value, 10) || 5
                    })
                  }
                  className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#929895] block mb-1">
                  Target Weight ({userProfile.unit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={userProfile.targetWeight}
                  onChange={e =>
                    updateUserProfile({ targetWeight: parseFloat(e.target.value) || 80 })
                  }
                  className="w-full bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
              </div>
            </div>

            <button type="submit" className="btn-electric-lime w-full py-2.5 text-xs font-black">
              Save Preferences
            </button>
          </form>
        </GlassCard>
      </section>

      {/* DATA MANAGEMENT & BACKUP (Fixes Bug #6: Full Export + Restore) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Shield className="w-4 h-4 text-[#929895]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            FULL DATA BACKUP & RESTORE
          </h3>
        </div>

        <GlassCard variant="standard" className="p-4 space-y-3">
          <p className="text-xs text-[#929895]">
            Export or restore your complete profile, workout logbook ({workoutSummaries.length}{' '}
            sessions), weekly schedule, nutrition logs, and cloned routines.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileImport}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleExportBackup}
              className="btn-electric-lime px-3.5 py-2 text-xs font-black flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Full Backup (.json)</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-glass-subtle px-3.5 py-2 rounded-xl text-xs font-bold text-[#C7FF3D] border-[#C7FF3D]/30 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import / Restore (.json)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyBackup}
              className="btn-glass-subtle px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy JSON</span>
            </button>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 text-rose-300 border border-rose-800/40 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.clear();
                    } catch {}
                    window.location.reload();
                  }}
                  className="px-3 py-2 rounded-xl bg-rose-600 text-white text-xs font-black"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="btn-glass-subtle px-2.5 py-2 rounded-xl text-xs font-bold text-[#929895]"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
