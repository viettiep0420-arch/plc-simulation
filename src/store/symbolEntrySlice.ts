import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InstructionKind = 'contact' | 'coil';

export interface SymbolEntryState {
  isOpen: boolean;
  deviceText: string;
  instruction: InstructionKind;
  enterSymbolContinuously: boolean;
  enterDeviceCommentContinuously: boolean;
  deviceError: string | null;
}

const initialState: SymbolEntryState = {
  isOpen: false,
  deviceText: '',
  instruction: 'contact',
  enterSymbolContinuously: false,
  enterDeviceCommentContinuously: false,
  deviceError: null,
};

const symbolEntrySlice = createSlice({
  name: 'symbolEntry',
  initialState,
  reducers: {
    openWithPreset: (state, action: PayloadAction<Partial<SymbolEntryState>>) => {
      state.isOpen = true;
      Object.assign(state, action.payload);
    },
    close: (state) => {
      state.isOpen = false;
    },
    setDeviceText: (state, action: PayloadAction<string>) => {
      const value = action.payload.toUpperCase();
      
      // Allow empty input
      if (value === '') {
        state.deviceText = '';
        state.deviceError = null;
        return;
      }

      // Validate Mitsubishi device format
      const validPrefixes = ['X', 'Y', 'M', 'D', 'T', 'C', 'R', 'Z', 'S'];
      const prefix = value[0];
      const suffix = value.slice(1);
      
      if (!validPrefixes.includes(prefix)) {
        state.deviceError = `Invalid device prefix. Valid prefixes: ${validPrefixes.join(', ')}`;
      } else if (!/^\d+$/.test(suffix)) {
        state.deviceError = 'Device number must contain only digits';
      } else if (suffix.length > 6) {
        state.deviceError = 'Device number too long (max 6 digits)';
      } else {
        state.deviceText = value;
        state.deviceError = null;
      }
    },
    setInstruction: (state, action: PayloadAction<InstructionKind>) => {
      state.instruction = action.payload;
    },
    toggleSymbolContinuously: (state) => {
      state.enterSymbolContinuously = !state.enterSymbolContinuously;
    },
    toggleDeviceCommentContinuously: (state) => {
      state.enterDeviceCommentContinuously = !state.enterDeviceCommentContinuously;
    },
  },
});

export const { actions: symbolEntryActions, reducer: symbolEntryReducer } = symbolEntrySlice;
export default symbolEntrySlice.reducer;
