interface EditFlags {
    /**
     * Whether the renderer believes it can undo.
     */
    Undo,
    /**
     * Whether the renderer believes it can redo.
     */
    Redo,
    /**
     * Whether the renderer believes it can cut.
     */
    Cut,
    /**
     * Whether the renderer believes it can copy.
     */
    Copy,
    /**
     * Whether the renderer believes it can paste.
     */
    Paste,
    /**
     * Whether the renderer believes it can delete.
     */
    Delete,
    /**
     * Whether the renderer believes it can select all.
     */
    SelectAll,
    /**
     * Whether the renderer believes it can edit text richly.
     */
    EditRichly
}

export type EditFlagsContext = keyof EditFlags