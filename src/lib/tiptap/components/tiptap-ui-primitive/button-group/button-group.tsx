import { cva, type VariantProps } from 'class-variance-authority';

import './button-group.scss';

import { cn } from '../../../lib/tiptap-utils';
import { Separator } from '../separator';

const buttonGroupVariants = cva('tiptap-button-group', {
   variants: {
      orientation: {
         horizontal: 'tiptap-button-group-horizontal',
         vertical: 'tiptap-button-group-vertical',
      },
   },
   defaultVariants: {
      orientation: 'horizontal',
   },
});

const ButtonGroup = ({
   className,
   orientation,
   ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) => {
   return (
      <div
         role='group'
         data-slot='tiptap-button-group'
         data-orientation={orientation}
         className={cn(buttonGroupVariants({ orientation }), className)}
         {...props}
      />
   );
};

const ButtonGroupSeparator = ({
   className,
   orientation = 'vertical',
   ...props
}: React.ComponentProps<typeof Separator>) => {
   return (
      <Separator
         data-slot='tiptap-button-group-separator'
         orientation={orientation}
         className={cn('tiptap-button-group-separator', className)}
         {...props}
      />
   );
};

export { ButtonGroup, ButtonGroupSeparator, buttonGroupVariants };
