import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './MarkdownEditor.css';


function MarkdownEditor() {
    const [markdownText, setMarkdownText] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ markdownText }),
        })
            .then(response => response.json())
            .then(data => setHtmlContent(data.html));
    }, [markdownText]);

    return (
        <div className="editor-container">
            <textarea
                className="markdown-input"
                value={markdownText}
                onChange={(e) => setMarkdownText(e.target.value)}
                placeholder="Type your Markdown here..."
            ></textarea>
            <div className="preview-pane">
                <ReactMarkdown
                    children={markdownText}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={okaidia}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default MarkdownEditor;
