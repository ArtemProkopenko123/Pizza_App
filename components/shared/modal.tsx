"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className="m-auto w-full max-w-md rounded-2xl shadow-2xl p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
            {children}
        </dialog>
    );
};

const Header = ({ children }: { children: React.ReactNode }) => (
    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        {children}
    </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
    <div className="px-6 py-4">
        {children}
    </div>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 border-t border-gray-100">
        {children}
    </div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
