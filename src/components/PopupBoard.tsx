// PopupBoard.tsx
import React, { ReactNode, useEffect } from 'react';

interface PopupBoardProps {
    children: ReactNode;
    onClose: () => void;
}

export default function PopupBoard({ children, onClose }: PopupBoardProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <section
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                animation: 'fadeIn 0.3s ease', // Fade-in animation
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    padding: '50px 40px',
                    width: '100%',
                    maxWidth: '450px', // Responsive width
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    animation: 'slideUp 0.4s ease', // Slide-up animation for popup
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <img src="/assets/imgs/theme/icons/icon-close.png" alt="Close" width={15} height={15} />
                </button>
                {children}
            </div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </section>
    );
}
