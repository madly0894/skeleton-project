import type { IModalProps } from '@/shared/common/models';

export interface IInitialState {
   modals: (IModalProps & {
      key: string;
      children: React.JSX.Element;
   })[];
}
