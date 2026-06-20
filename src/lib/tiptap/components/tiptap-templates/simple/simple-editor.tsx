import { useEffect, useRef, useState } from 'react';
import { Highlight } from '@tiptap/extension-highlight';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Placeholder } from '@tiptap/extensions/placeholder';
import { Selection } from '@tiptap/extensions/selection';
import { type Editor, EditorContent, EditorContext, useEditor } from '@tiptap/react';
// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit';

import useMediaQuery from '@/shared/hooks/useMediaQuery';

// --- Hooks ---
// --- Lib ---
import '../../tiptap-node/blockquote-node/blockquote-node.scss';
import '../../tiptap-node/code-block-node/code-block-node.scss';
import '../../tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '../../tiptap-node/list-node/list-node.scss';
import '../../tiptap-node/heading-node/heading-node.scss';
import '../../tiptap-node/paragraph-node/paragraph-node.scss';
// --- Styles ---
import './simple-editor.scss';

// --- Icons ---
import { ArrowLeftIcon } from '../../tiptap-icons/arrow-left-icon';
import { HighlighterIcon } from '../../tiptap-icons/highlighter-icon';
import { LinkIcon } from '../../tiptap-icons/link-icon';
import { HorizontalRule } from '../../tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
// --- Components ---
import { BlockquoteButton } from '../../tiptap-ui/blockquote-button';
import { CodeBlockButton } from '../../tiptap-ui/code-block-button';
import {
   ColorHighlightPopover,
   ColorHighlightPopoverButton,
   ColorHighlightPopoverContent,
} from '../../tiptap-ui/color-highlight-popover';
// --- Tiptap UI ---
import { HeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu';
import { LinkButton, LinkContent, LinkPopover } from '../../tiptap-ui/link-popover';
import { ListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu';
import { MarkButton } from '../../tiptap-ui/mark-button';
import { TextAlignButton } from '../../tiptap-ui/text-align-button';
import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button';
// --- UI Primitives ---
import { Button } from '../../tiptap-ui-primitive/button/button';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '../../tiptap-ui-primitive/toolbar';

const MainToolbarContent = ({
   onHighlighterClick,
   onLinkClick,
   isMobile,
}: {
   onHighlighterClick: VoidFunction;
   onLinkClick: VoidFunction;
   isMobile: boolean;
}) => {
   return (
      <>
         <ToolbarGroup>
            <UndoRedoButton action='undo' />
            <UndoRedoButton action='redo' />
         </ToolbarGroup>

         <ToolbarSeparator />

         <ToolbarGroup>
            <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
            <ListDropdownMenu modal={false} types={['bulletList', 'orderedList', 'taskList']} />
            <BlockquoteButton />
            <CodeBlockButton />
         </ToolbarGroup>

         <ToolbarSeparator />

         <ToolbarGroup>
            <MarkButton type='bold' />
            <MarkButton type='italic' />
            <MarkButton type='strike' />
            <MarkButton type='code' />
            <MarkButton type='underline' />

            {!isMobile ? (
               <>
                  <ColorHighlightPopover />
                  <LinkPopover />
               </>
            ) : (
               <>
                  <ColorHighlightPopoverButton onClick={onHighlighterClick} />
                  <LinkButton onClick={onLinkClick} />
               </>
            )}
         </ToolbarGroup>

         <ToolbarSeparator />

         <ToolbarGroup>
            <TextAlignButton align='left' />
            <TextAlignButton align='center' />
            <TextAlignButton align='right' />
            <TextAlignButton align='justify' />
         </ToolbarGroup>
      </>
   );
};

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: VoidFunction }) => (
   <>
      <ToolbarGroup>
         <Button variant='ghost' onClick={onBack}>
            <ArrowLeftIcon className='tiptap-button-icon' style={{ marginRight: '0.875rem' }} />
            {type === 'highlighter' ? (
               <HighlighterIcon className='tiptap-button-icon' />
            ) : (
               <LinkIcon className='tiptap-button-icon' />
            )}
         </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
   </>
);

type TProps = {
   name?: string;
   placeholder?: string;
   value?: string;
   onChange?: (html: string) => void;
   onBlur?: VoidFunction;
   disabled?: boolean;
   type?: 'html' | 'text';
};

const formValues = (editor: Editor) =>
   ({
      text: editor.getText(),
      html: editor.getHTML(),
   }) as const;

export const SimpleEditor: React.FC<TProps> = ({
   name,
   placeholder = 'Write something...',
   value,
   onChange,
   onBlur,
   disabled = false,
   type = 'html',
}) => {
   const { isMobile } = useMediaQuery({ isMobile: '(max-width: 600px)' });

   const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');
   const toolbarRef = useRef<HTMLDivElement>(null);

   const editor = useEditor({
      immediatelyRender: false,
      editable: !disabled,
      editorProps: {
         attributes: {
            autocomplete: 'off',
            autocorrect: 'off',
            autocapitalize: 'off',
            'aria-label': placeholder,
            class: 'simple-editor',
         },
      },
      extensions: [
         StarterKit.configure({
            horizontalRule: false,
            link: {
               openOnClick: false,
               enableClickSelection: true,
            },
         }),
         HorizontalRule,
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
         TaskList,
         TaskItem.configure({ nested: true }),
         Highlight.configure({ multicolor: true }),
         Typography,
         Selection,
         Placeholder.configure({
            placeholder,
         }),
      ],
      content: value,
      onUpdate: ({ editor }) => onChange?.(formValues(editor)[type]),
      onBlur: () => onBlur?.(),
   });

   // Синхронизируем внешний value с редактором
   useEffect(() => {
      if (editor !== null && value !== undefined && value !== formValues(editor)[type]) {
         editor.commands.setContent(value, {
            emitUpdate: false, // false = не триггерить onUpdate
         });
      }
   }, [editor, value]);

   return (
      <div className='simple-editor-wrapper'>
         <EditorContext.Provider value={{ editor }}>
            <Toolbar ref={toolbarRef} variant={isMobile ? 'floating' : 'fixed'}>
               {isMobile && mobileView !== 'main' ? (
                  <MobileToolbarContent
                     type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
                     onBack={() => setMobileView('main')}
                  />
               ) : (
                  <MainToolbarContent
                     onHighlighterClick={() => setMobileView('highlighter')}
                     onLinkClick={() => setMobileView('link')}
                     isMobile={isMobile}
                  />
               )}
            </Toolbar>

            <EditorContent name={name} editor={editor} role='presentation' className='simple-editor-content' />
         </EditorContext.Provider>
      </div>
   );
};
