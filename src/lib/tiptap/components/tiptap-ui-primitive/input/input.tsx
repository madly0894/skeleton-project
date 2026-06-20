import './input.scss';

import { cn } from '../../../lib/tiptap-utils';

const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
   return <input type={type} data-slot='tiptap-input' className={cn('tiptap-input', className)} {...props} />;
};

export { Input };
