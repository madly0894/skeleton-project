import { cloneElement } from 'react';

import useModal from '@/shared/hooks/useModal';

const FuseModals: React.FC = () => {
   const { modals, closeModal } = useModal();

   return (
      <>
         {modals.map(
            ({
               key,
               children,
               data,
               open = true,
               // onClose
            }) =>
               cloneElement(children, {
                  key,
                  data,
                  open,
                  onClose: () => closeModal(key),
               }),
         )}
      </>
   );
};

export default FuseModals;
