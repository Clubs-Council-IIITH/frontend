import { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor, Element as SlateElement } from "slate";
import { withHistory } from "slate-history";

import { Button, Toolbar } from "./Components";

import {
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
    FormatUnderlined as UnderlinedIcon,
    Code as CodeIcon,
    LooksOne as H1Icon,
    LooksTwo as H2Icon,
    FormatQuote as QuoteIcon,
    FormatListNumbered as NumberedListIcon,
    FormatListBulleted as BulletedListIcon,
    FormatAlignLeft as AlignLeftIcon,
    FormatAlignJustify as AlignJustifyIcon,
    FormatAlignRight as AlignRightIcon,
    FormatAlignCenter as AlignCenterIcon,
} from "@mui/icons-material";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextEditor = ({ editing = false, editorState: [value, setValue] }) => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(v) => {
                const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
                if (isAstChange) {
                    setValue(v);
                }
            }}
        >
            {editing ? (
                <Toolbar>
                    <MarkButton format="bold" icon={BoldIcon} />
                    <MarkButton format="italic" icon={ItalicIcon} />
                    <MarkButton format="underline" icon={UnderlinedIcon} />
                    <MarkButton format="code" icon={CodeIcon} />
                    <BlockButton format="heading-one" icon={H1Icon} />
                    <BlockButton format="heading-two" icon={H2Icon} />
                    {/* <BlockButton format="block-quote" icon={QuoteIcon} /> */}
                    <BlockButton format="numbered-list" icon={NumberedListIcon} />
                    <BlockButton format="bulleted-list" icon={BulletedListIcon} />
                    {/* <BlockButton format="left" icon={AlignLeftIcon} /> */}
                    {/* <BlockButton format="center" icon={AlignCenterIcon} /> */}
                    {/* <BlockButton format="right" icon={AlignRightIcon} /> */}
                    {/* <BlockButton format="justify" icon={AlignJustifyIcon} /> */}
                </Toolbar>
            ) : null}

            <Editable
                readOnly={!editing}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="No description provided."
                spellCheck
                autoFocus
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });
    let newProperties;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
    }
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
        })
    );

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
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

const BlockButton = ({ format, icon: Icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
            )}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon />
        </Button>
    );
};

const MarkButton = ({ format, icon: Icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon />
        </Button>
    );
};

export default RichTextEditor;
