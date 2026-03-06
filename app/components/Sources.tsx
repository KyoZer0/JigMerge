interface Source {
    id: number;
    text: string;
    url?: string;
}

interface SourcesProps {
    sources: Source[];
}

export default function Sources({ sources }: SourcesProps) {
    if (!sources || sources.length === 0) return null;

    return (
        <div style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)',
        }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Sources &amp; References
            </h2>
            <ol style={{
                paddingLeft: '1.25rem',
                margin: 0,
                listStyleType: 'decimal',
            }}>
                {sources.map((source) => (
                    <li key={source.id} style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.6,
                    }}>
                        {source.url ? (
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--primary-light)' }}
                            >
                                {source.text}
                            </a>
                        ) : (
                            source.text
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}
