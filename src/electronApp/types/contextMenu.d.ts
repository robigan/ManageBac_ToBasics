interface EditFlags {
    /**
     * Whether the renderer believes it can undo.
     */
    Undo: boolean;
    /**
     * Whether the renderer believes it can redo.
     */
    Redo: boolean;
    /**
     * Whether the renderer believes it can cut.
     */
    Cut: boolean;
    /**
     * Whether the renderer believes it can copy.
     */
    Copy: boolean;
    /**
     * Whether the renderer believes it can paste.
     */
    Paste: boolean;
    /**
     * Whether the renderer believes it can delete.
     */
    Delete: boolean;
    /**
     * Whether the renderer believes it can select all.
     */
    SelectAll: boolean;
    /**
     * Whether the renderer believes it can edit text richly.
     */
    EditRichly: boolean;
}

export type EditFlagsContext = keyof EditFlags