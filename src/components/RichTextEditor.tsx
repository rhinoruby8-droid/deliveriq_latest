import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';
import { Bold, Italic, List, Heading1, Heading2, Link as LinkIcon, RotateCcw, RotateCw, Trash2, Code, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline cursor-pointer',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert focus:outline-none max-w-none text-xs text-foreground min-h-[120px] p-4 bg-background border border-border border-t-0 rounded-b font-sans',
      },
    },
  });

  const [showSource, setShowSource] = useState(true);

  const toggleSource = () => {
    if (showSource) {
      editor?.commands.setContent(value, { emitUpdate: false });
    }
    setShowSource(!showSource);
  };

  // Sync state updates from outside (like switching tabs or loading from CMS API)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl || 'https://');
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-[10px] text-muted-foreground font-semibold mb-1 uppercase tracking-wider">{label}</label>}
      
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-card border border-border rounded-t">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bold') ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Bold"
        >
          <Bold size={13} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('italic') ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Italic"
        >
          <Italic size={13} />
        </button>

        <div className="w-px h-5 bg-muted mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Heading 1"
        >
          <Heading1 size={13} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Heading 2"
        >
          <Heading2 size={13} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('paragraph') ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Paragraph"
        >
          <span className="text-[10px] font-bold px-0.5">P</span>
        </button>

        <div className="w-px h-5 bg-muted mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bulletList') ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Bullet List"
        >
          <List size={13} />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('link') ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Link"
        >
          <LinkIcon size={13} />
        </button>

        <div className="w-px h-5 bg-muted mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
          title="Undo"
        >
          <RotateCcw size={13} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 rounded text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
          title="Redo"
        >
          <RotateCw size={13} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="p-1.5 rounded text-red-500 hover:bg-red-950/20 hover:text-red-400 ml-auto"
          title="Clear Formatting"
        >
          <Trash2 size={13} />
        </button>

        <div className="w-px h-5 bg-muted mx-1" />

        <button
          type="button"
          onClick={toggleSource}
          className={`p-1.5 rounded transition-colors ${
            showSource ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Source Code"
        >
          <Code size={13} />
        </button>
      </div>

      {/* Editor Content Area / Source Code view */}
      {showSource ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full font-mono text-[11px] bg-background border border-border border-t-0 rounded-b p-4 text-foreground min-h-[300px] focus:outline-none focus:border-primary leading-relaxed resize-y"
          placeholder="Write raw HTML code here..."
        />
      ) : (
        <div className="flex flex-col">
          <EditorContent editor={editor} />
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-950/20 border border-border border-t-0 text-yellow-500 text-[10px] rounded-b font-medium">
            <AlertTriangle size={12} className="shrink-0" />
            <span>Warning: Visual mode can simplify complex Tailwind layout containers. Use Source Code view to preserve raw structures.</span>
          </div>
        </div>
      )}
      
      {/* Editor styles overrides */}
      <style>{`
        .ProseMirror p {
          margin-bottom: 0.5rem;
        }
        .ProseMirror p:last-child {
          margin-bottom: 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h1 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #F0EDE8;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.1rem;
          font-weight: bold;
          color: #C79A4E;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror a {
          color: #C79A4E;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
