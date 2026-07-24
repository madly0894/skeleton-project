import type { IInitialState } from './models';

import createAppSlice from '../../create-app-slice';

const initialState: IInitialState = {
   modals: [],
};

const modalSlice = createAppSlice({
   name: 'modal',
   initialState,
   reducers: creator => ({
      openModal: creator.reducer<IInitialState['modals'][number]>((state, action) => {
         state.modals.push(action.payload);
      }),
      closeModal: creator.reducer<string>((state, action) => {
         const index = state.modals.findIndex(item => item.key === action.payload);
         if (index !== -1) {
            state.modals.splice(index, 1);
         }
      }),
   }),
   selectors: {
      selectModals: sliceState => sliceState.modals,
   },
});

export const { selectModals } = modalSlice.selectors;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
