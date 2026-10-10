import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Unlock } from 'lucide-react';

const variantStyles = {
    success: {
        iconBg: 'bg-emerald-50 text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700',
        Icon: CheckCircle2,
    },
    danger: {
        iconBg: 'bg-rose-50 text-rose-600',
        button: 'bg-rose-600 hover:bg-rose-700',
        Icon: XCircle,
    },
    warning: {
        iconBg: 'bg-amber-50 text-amber-600',
        button: 'bg-amber-600 hover:bg-amber-700',
        Icon: AlertTriangle,
    },
    info: {
        iconBg: 'bg-blue-50 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        Icon: Unlock,
    },
};

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    description = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'success',
}) {
    if (!isOpen) return null;

    const style = variantStyles[variant] || variantStyles.success;
    const Icon = style.Icon;

    const handleConfirm = () => {
        onConfirm?.();
        onClose?.();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between relative border border-slate-100 w-full max-w-md">

                <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-full shrink-0 ${style.iconBg}`}>
                        <Icon size={22} />
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-slate-800">{title}</h3>
                        {description && (
                            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors shadow-sm cursor-pointer ${style.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}