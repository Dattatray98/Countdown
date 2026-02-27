import React, { useState } from 'react';
import { X, Clock, Flame } from 'lucide-react';

interface TimerSettingsProps {
    onClose: () => void;
    onSetTime: (seconds: number) => void;
    onAddTime: (seconds: number) => void;
}

export function TimerSettings({ onClose, onSetTime, onAddTime }: TimerSettingsProps) {
    const [minutesInput, setMinutesInput] = useState<string>('15');

    const handleSetCustomTime = (e: React.FormEvent) => {
        e.preventDefault();
        const mins = parseInt(minutesInput);
        if (!isNaN(mins) && mins > 0) {
            onSetTime(mins * 60);
            onClose();
        }
    };

    const quickPicks = [5, 10, 15, 30, 45, 60];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-core/90 backdrop-blur-sm transition-all">
            <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <h2 className="text-2xl font-teko uppercase tracking-widest text-primary-accent flex items-center gap-2">
                        <Flame size={20} className="text-primary-accent" /> Match Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-text-secondary hover:text-text-primary hover:bg-zinc-800 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8 font-rajdhani">

                    {/* Quick Start Buttons */}
                    <div className="space-y-4">
                        <h3 className="text-sm uppercase tracking-wider text-text-secondary flex items-center gap-2">
                            <Clock size={16} /> Quick Set (Minutes)
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {quickPicks.map(m => (
                                <button
                                    key={m}
                                    onClick={() => { onSetTime(m * 60); onClose(); }}
                                    className="py-3 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-primary-accent/50 rounded text-lg font-semibold transition-all"
                                >
                                    {m} MIN
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-zinc-800" />

                    {/* Quick Add Time */}
                    <div className="space-y-4">
                        <h3 className="text-sm uppercase tracking-wider text-text-secondary">Add Time To Current Match</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { onAddTime(60 * 5); onClose(); }}
                                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-status-success rounded text-lg font-semibold transition-all text-status-success"
                            >
                                + 5 MIN
                            </button>
                            <button
                                onClick={() => { onAddTime(60 * 10); onClose(); }}
                                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-status-success rounded text-lg font-semibold transition-all text-status-success"
                            >
                                + 10 MIN
                            </button>
                        </div>
                    </div>

                    <hr className="border-zinc-800" />

                    {/* Custom Time */}
                    <form onSubmit={handleSetCustomTime} className="space-y-4">
                        <h3 className="text-sm uppercase tracking-wider text-text-secondary">Custom Time</h3>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={minutesInput}
                                    onChange={e => setMinutesInput(e.target.value)}
                                    className="w-full bg-bg-core border border-zinc-700 focus:border-primary-accent outline-none rounded py-3 pl-4 pr-12 text-lg font-bold text-text-primary transition-colors focus:shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-bold uppercase tracking-widest">
                                    Min
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-primary-accent hover:bg-primary-hover text-zinc-950 font-bold uppercase tracking-wider rounded transition-colors shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                            >
                                Set
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
