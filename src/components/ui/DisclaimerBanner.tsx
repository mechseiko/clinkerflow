import React from 'react';
import { AlertCircle } from 'lucide-react';

export function DisclaimerBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
      <span className="text-[10px] leading-relaxed text-amber-400 font-medium">
        Values shown are illustrative engineering examples developed for demonstration purposes and do not represent actual Dangote Cement operational data.
      </span>
    </div>
  );
}
