import type { IModalProps } from '@/shared/types/models';

export interface IInitialState {
   modals: (IModalProps & {
      key: string;
      children: React.JSX.Element;
   })[];
}
