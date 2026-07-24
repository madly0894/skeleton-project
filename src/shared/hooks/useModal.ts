import { closeModal, openModal, selectModals } from '@/shared/store/slices/modal/slice';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

export default function useModal() {
   const modals = useAppSelector(selectModals);
   const dispatch = useAppDispatch();

   const openDialog = (
      props: Omit<(typeof modals)[number], 'key'> & {
         key?: string;
      },
   ) => {
      const key = crypto.randomUUID();
      dispatch(openModal({ ...props, key: props?.key ?? key }));
   };

   const closeDialog = (key: string) => {
      dispatch(closeModal(key));
   };

   return {
      modals,
      openModal: openDialog,
      closeModal: closeDialog,
   };
}
