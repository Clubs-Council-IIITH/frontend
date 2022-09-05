import { useState, useCallback, useMemo } from "react";

import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { Box, IconButton } from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const RichTextEditor = ({ editing = false, editorState: [value, setValue] }) => {
    const [editor] = useState(() => withReact(createEditor()));

    // parse input initial value or use fallback value
    const initialValue = useMemo(
        () =>
            JSON.parse(value) || [
                {
                    type: "paragraph",
                    children: [{ text: "No description provided." }],
                },
            ]
    );

    const renderElement = ({ attributes, children, element }) => {
        const style = { textAlign: element.align };
        switch (element.type) {
            case "block-quote":
                return (
                    <blockquote style={style} {...attributes}>
                        {children}
                    </blockquote>
                );
            case "bulleted-list":
                return (
                    <ul style={style} {...attributes}>
                        {children}
                    </ul>
                );
            case "heading-one":
                return (
                    <h1 style={style} {...attributes}>
                        {children}
                    </h1>
                );
            case "heading-two":
                return (
                    <h2 style={style} {...attributes}>
                        {children}
                    </h2>
                );
            case "list-item":
                return (
                    <li style={style} {...attributes}>
                        {children}
                    </li>
                );
            case "numbered-list":
                return (
                    <ol style={style} {...attributes}>
                        {children}
                    </ol>
                );
            default:
                return (
                    <p style={style} {...attributes}>
                        {children}
                    </p>
                );
        }
    };

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const [code, setCode] = useState(false);

    return (
        // Add a toolbar with buttons that call the same methods.
        <Slate
            editor={editor}
            value={initialValue}
            onChange={(val) => {
                const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
                if (isAstChange) {
                    // Store value in the state variable
                    const content = JSON.stringify(val);
                    setValue(content);
                }
            }}
        >
            {editing ? (
                <Box>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }}
                    >
                        <FormatBoldIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleItalicMark(editor);
                        }}
                    >
                        <FormatItalicIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleUnderlinedMark(editor);
                        }}
                    >
                        <FormatUnderlinedIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleH1Block(editor);
                        }}
                    >
                        <LooksOneIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleH2Block(editor);
                        }}
                    >
                        <LooksTwoIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleQuoteBlock(editor);
                        }}
                    >
                        <FormatQuoteIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleNumBlock(editor);
                        }}
                    >
                        <FormatListNumberedIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBulBlock(editor);
                        }}
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                    <IconButton
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                            setCode(CustomEditor.isCodeBlockActive(editor));
                        }}
                    >
                        {code ? <CodeOffIcon /> : <CodeIcon />}
                    </IconButton>
                </Box>
            ) : null}

            <Editable
                readOnly={!editing}
                editor={editor}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    if (!event.ctrlKey) return;

                    switch (event.key) {
                        case "`": {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                            break;
                        }

                        case "b": {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                            break;
                        }
                    }
                }}
            />
        </Slate>
    );
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.bold === true,
            universal: true,
        });

        return !!match;
    },

    isItalicMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.italic === true,
            universal: true,
        });

        return !!match;
    },

    isUnderlinedMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.underline === true,
            universal: true,
        });

        return !!match;
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.code === true,
            universal: true,
        });

        return !!match;
    },

    isH1Active(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "heading-one",
        });

        return !!match;
    },

    isH2Active(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "heading-two",
        });

        return !!match;
    },

    isQuoteActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "block-quote",
        });

        return !!match;
    },

    isNumActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "numbered-list",
        });

        return !!match;
    },

    isBulActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "bulleted-list",
        });

        return !!match;
    },

    isListActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === "list-item",
        });

        return !!match;
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor);
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleUnderlinedMark(editor) {
        const isActive = CustomEditor.isUnderlinedMarkActive(editor);
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },

    toggleH1Block(editor) {
        const isActive = CustomEditor.isH1Active(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "heading-one" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleH2Block(editor) {
        const isActive = CustomEditor.isH2Active(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "heading-two" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleQuoteBlock(editor) {
        const isActive = CustomEditor.isQuoteActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "block-quote" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleNumBlock(editor) {
        const isActive = CustomEditor.isNumActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "numbered-list" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleBulBlock(editor) {
        const isActive = CustomEditor.isBulActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "bulleted-list" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleListBlock(editor) {
        const isActive = CustomEditor.isListActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : "list-item" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor);
        Transforms.setNodes(
            editor,
            { code: isActive ? null : true },
            { match: (n) => Text.isText(n), split: true }
        );
    },
};

export default RichTextEditor;
