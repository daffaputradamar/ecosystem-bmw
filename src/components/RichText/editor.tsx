import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import EditorToolbar from "./toolbar/editor-toolbar"
import { useEffect } from "react"

interface EditorProps {
    content: string
    placeholder?: string
    onChange: (value: string) => void
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
    
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content); // Set the content after editor is initialized
        }
    }, [editor, content]); // Re-run when editor or content changes

    if (!editor) return <></>

    return (
        <div className="prose max-w-none w-full border border-input bg-background dark:prose-invert">
            <EditorToolbar editor={editor} />
            <div className="editor">
                <EditorContent editor={editor} placeholder={placeholder} />
            </div>
        </div>
    )
}

export default Editor
