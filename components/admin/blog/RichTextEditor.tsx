'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { useState, useEffect } from 'react'
import ImageFigure from './tiptap/ImageFigureExtension'
import ImagePickerModal from './ImagePickerModal'
import type { Locale } from '@/lib/blog/types'

interface RichTextEditorProps {
  content: string
  locale: Locale
  onChange: (html: string) => void
}

function ToolbarButton({ onClick, active, label, children }: {
  onClick: () => void
  active?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        padding: '6px 9px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 600,
        background: active ? 'rgba(227,78,46,0.14)' : 'transparent',
        color: active ? '#C43E22' : '#625B55',
      }}
    >
      {children}
    </button>
  )
}

export default function RichTextEditor({ content, locale, onChange }: RichTextEditorProps) {
  const [imagePickerOpen, setImagePickerOpen] = useState(false)
  const isFa = locale === 'fa'

  const editor = useEditor({
    extensions: [
      // StarterKit bundles its own Link extension by default (tiptap v3) —
      // disable it here so our separately-configured Link below is the
      // only one registered (avoids the "Duplicate extension names" warning).
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      ImageFigure,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        dir: isFa ? 'rtl' : 'ltr',
        class: 'blog-body',
        style: `min-height: 260px; outline: none; font-family: ${isFa ? "'Noto Naskh Arabic', serif" : 'system-ui, sans-serif'};`,
      },
    },
  })

  // Keep the editor in sync if the parent swaps content out from under it
  // (e.g. switching language tabs re-mounts with different initial content).
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (!editor) return null

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Link URL', previousUrl ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div style={{ border: '0.5px solid rgba(17,17,17,0.14)', borderRadius: '10px', background: '#FFFDF8', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', padding: '6px 8px', borderBottom: '0.5px solid rgba(17,17,17,0.10)', background: 'rgba(17,17,17,0.02)' }}>
        <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><i>i</i></ToolbarButton>
        <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
        <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>•</ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;</ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive('link')} onClick={setLink}>🔗</ToolbarButton>
        <ToolbarButton label="Insert image" onClick={() => setImagePickerOpen(true)}>🖼</ToolbarButton>
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <EditorContent editor={editor} />
      </div>

      {imagePickerOpen && (
        <ImagePickerModal
          prefix="body"
          collectAltCaption
          onClose={() => setImagePickerOpen(false)}
          onConfirm={({ url, alt, caption }) => {
            editor.chain().focus().insertImageFigure({ src: url, alt: alt ?? '', caption }).run()
            setImagePickerOpen(false)
          }}
        />
      )}
    </div>
  )
}
