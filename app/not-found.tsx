import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="container" style={{
            height: '100vh',
            width: '100vw',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            color: '#fff',
            marginTop: '-80px', // Pull up behind header if possible to ensure full coverage
        }}>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-text {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
      `}} />

            {/* Background Image */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: -2,
            }}>
                <Image
                    src="/404.gif"
                    alt="Confused character 404"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    unoptimized
                    priority
                />
            </div>

            {/* Dark Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: -1,
                backdropFilter: 'blur(3px)'
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
                <h1 className="animate-text delay-1" style={{
                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: '0',
                    fontFamily: 'var(--font-display)',
                    textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                }}>
                    404
                </h1>

                <h2 className="animate-text delay-2" style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    marginBottom: '1.5rem',
                    fontWeight: 600,
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    Lost in the puzzle?
                </h2>

                <p className="animate-text delay-3" style={{
                    marginBottom: '2.5rem',
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    The piece you're looking for seems to be missing. It might have been moved, deleted, or never existed in the first place.
                </p>

                <div className="animate-text delay-4">
                    <Link href="/" className="btn btn-primary" style={{
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        boxShadow: '0 8px 30px rgba(232, 97, 77, 0.4)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        Back to Safety
                    </Link>
                </div>
            </div>
        </div>
    );
}
