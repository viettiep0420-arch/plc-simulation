import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { symbolEntryActions, type SymbolEntryState } from '../../store/symbolEntrySlice';
import type { RootState } from '../../store/store';

const INSTR_OPTS = [
  { value: 'contact', label: 'Contact (—| |—)' },
  { value: 'coil', label: 'Coil ( )' },
] as const;

export default function EnterSymbolDialog() {
  const dispatch = useDispatch();
  const symbolEntry = useSelector((state: RootState) => state.symbolEntry) as SymbolEntryState;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => dispatch(symbolEntryActions.close());

  useEffect(() => {
    if (symbolEntry.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [symbolEntry.isOpen, handleClose]);

  if (!symbolEntry.isOpen) return null;
  const handleDeviceTextChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    dispatch(symbolEntryActions.setDeviceText(e.target.value));
  const handleInstructionChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
    dispatch(symbolEntryActions.setInstruction(e.target.value as 'contact' | 'coil'));
  const toggleSymbolContinuously = () => 
    dispatch(symbolEntryActions.toggleSymbolContinuously());
  const toggleDeviceCommentContinuously = () => 
    dispatch(symbolEntryActions.toggleDeviceCommentContinuously());

  const dispatchOk = () => {
    const detail = { 
      instruction: symbolEntry.instruction, 
      device: symbolEntry.deviceText.trim() 
    };
    window.dispatchEvent(new CustomEvent('symbol/commit', { detail }));
    
    if (symbolEntry.enterSymbolContinuously) {
      if (!symbolEntry.enterDeviceCommentContinuously) {
        dispatch(symbolEntryActions.setDeviceText(''));
      }
    } else {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-[560px] rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-3">
          <div className="font-semibold">Enter Symbol</div>
          <button 
            aria-label="Close" 
            onClick={handleClose} 
            className="px-2"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-3">
            <label className="w-32 text-sm text-gray-600">Instruction</label>
            <select
              value={symbolEntry.instruction}
              onChange={handleInstructionChange}
              className="flex-1 rounded border p-2"
            >
              {INSTR_OPTS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="w-32 text-sm text-gray-600">Device/Label</label>
            <input
              ref={inputRef}
              value={symbolEntry.deviceText}
              onChange={handleDeviceTextChange}
              onKeyDown={(e) => { 
                if (e.key === 'Enter') document.getElementById('btn-ok')?.click(); 
              }}
              className="flex-1 rounded border p-2"
              placeholder="X10 / Y20 / M0 ..."
            />
            {symbolEntry.deviceError && (
              <div className="text-sm text-red-600 mt-1">{symbolEntry.deviceError}</div>
            )}
          </div>

          <div className="flex gap-6 pl-32">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={symbolEntry.enterSymbolContinuously} 
                onChange={toggleSymbolContinuously}
              />
              Enter symbol continuously
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={symbolEntry.enterDeviceCommentContinuously} 
                onChange={toggleDeviceCommentContinuously}
              />
              Enter device/comment continuously
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t p-3">
          <button 
            className="rounded border px-3 py-1" 
            onClick={() => alert('Open help doc…')}
          >
            Help
          </button>
          <button 
            className="rounded border px-3 py-1" 
            onClick={handleClose}
          >
            Exit
          </button>
          <button 
            id="btn-ok" 
            className="rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50" 
            onClick={dispatchOk}
            disabled={!!symbolEntry.deviceError}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
