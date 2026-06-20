import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import './dropdown-menu.scss';

import { cn } from '../../../lib/tiptap-utils';
import { CheckIcon } from '../../tiptap-icons/check-icon';

const DropdownMenu = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => {
   return <DropdownMenuPrimitive.Root data-slot='tiptap-dropdown-menu' {...props} />;
};

const DropdownMenuPortal = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) => {
   return <DropdownMenuPrimitive.Portal data-slot='tiptap-dropdown-menu-portal' {...props} />;
};

const DropdownMenuTrigger = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => {
   return <DropdownMenuPrimitive.Trigger data-slot='tiptap-dropdown-menu-trigger' {...props} />;
};

const DropdownMenuContent = ({
   className,
   align = 'start',
   sideOffset = 4,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => {
   return (
      <DropdownMenuPrimitive.Portal>
         <DropdownMenuPrimitive.Content
            data-slot='tiptap-dropdown-menu-content'
            sideOffset={sideOffset}
            align={align}
            className={cn('tiptap-dropdown-menu-content', className)}
            onCloseAutoFocus={e => e.preventDefault()}
            {...props}
         />
      </DropdownMenuPrimitive.Portal>
   );
};

const DropdownMenuGroup = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) => {
   return (
      <DropdownMenuPrimitive.Group
         data-slot='tiptap-dropdown-menu-group'
         className={cn('tiptap-dropdown-menu-group', className)}
         {...props}
      />
   );
};

const DropdownMenuItem = ({
   className,
   inset,
   variant = 'default',
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
   inset?: boolean;
   variant?: 'default' | 'destructive';
}) => {
   return (
      <DropdownMenuPrimitive.Item
         data-slot='tiptap-dropdown-menu-item'
         data-inset={inset}
         data-variant={variant}
         className={cn('tiptap-dropdown-menu-item', className)}
         {...props}
      />
   );
};

const DropdownMenuCheckboxItem = ({
   className,
   children,
   checked,
   inset,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
   inset?: boolean;
}) => {
   return (
      <DropdownMenuPrimitive.CheckboxItem
         data-slot='tiptap-dropdown-menu-checkbox-item'
         data-inset={inset}
         className={cn('tiptap-dropdown-menu-checkbox-item', className)}
         checked={checked}
         {...props}
      >
         <span className='tiptap-dropdown-menu-item-indicator' data-slot='tiptap-dropdown-menu-checkbox-item-indicator'>
            <DropdownMenuPrimitive.ItemIndicator>
               <CheckIcon />
            </DropdownMenuPrimitive.ItemIndicator>
         </span>
         {children}
      </DropdownMenuPrimitive.CheckboxItem>
   );
};

const DropdownMenuRadioGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => {
   return <DropdownMenuPrimitive.RadioGroup data-slot='tiptap-dropdown-menu-radio-group' {...props} />;
};

const DropdownMenuRadioItem = ({
   className,
   children,
   inset,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
   inset?: boolean;
}) => {
   return (
      <DropdownMenuPrimitive.RadioItem
         data-slot='tiptap-dropdown-menu-radio-item'
         data-inset={inset}
         className={cn('tiptap-dropdown-menu-radio-item', className)}
         {...props}
      >
         <span className='tiptap-dropdown-menu-item-indicator' data-slot='tiptap-dropdown-menu-radio-item-indicator'>
            <DropdownMenuPrimitive.ItemIndicator>
               <CheckIcon />
            </DropdownMenuPrimitive.ItemIndicator>
         </span>
         {children}
      </DropdownMenuPrimitive.RadioItem>
   );
};

const DropdownMenuLabel = ({
   className,
   inset,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
   inset?: boolean;
}) => {
   return (
      <DropdownMenuPrimitive.Label
         data-slot='tiptap-dropdown-menu-label'
         data-inset={inset}
         className={cn('tiptap-dropdown-menu-label', className)}
         {...props}
      />
   );
};

const DropdownMenuSeparator = ({
   className,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => {
   return (
      <DropdownMenuPrimitive.Separator
         data-slot='tiptap-dropdown-menu-separator'
         className={cn('tiptap-dropdown-menu-separator', className)}
         {...props}
      />
   );
};

const DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
   return (
      <span
         data-slot='tiptap-dropdown-menu-shortcut'
         className={cn('tiptap-dropdown-menu-shortcut', className)}
         {...props}
      />
   );
};

const DropdownMenuSub = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) => {
   return <DropdownMenuPrimitive.Sub data-slot='tiptap-dropdown-menu-sub' {...props} />;
};

const DropdownMenuSubTrigger = ({
   className,
   inset,
   children,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
   inset?: boolean;
}) => {
   return (
      <DropdownMenuPrimitive.SubTrigger
         data-slot='tiptap-dropdown-menu-sub-trigger'
         data-inset={inset}
         className={cn('tiptap-dropdown-menu-sub-trigger', className)}
         {...props}
      >
         {children}
      </DropdownMenuPrimitive.SubTrigger>
   );
};

const DropdownMenuSubContent = ({
   className,
   ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => {
   return (
      <DropdownMenuPrimitive.SubContent
         data-slot='tiptap-dropdown-menu-sub-content'
         className={cn('tiptap-dropdown-menu-sub-content', className)}
         {...props}
      />
   );
};

export {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
};
