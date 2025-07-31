import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const portalRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a div to mount the portal
    portalRoot.current = document.createElement('div');
    portalRoot.current.id = 'command-palette-portal';
    document.body.appendChild(portalRoot.current);

    return () => {
      // Clean up on unmount
      if (portalRoot.current) {
        document.body.removeChild(portalRoot.current);
      }
    };
  }, []);

  if (!portalRoot.current) return null;

  return createPortal(children, portalRoot.current);
}