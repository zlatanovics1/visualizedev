"use client";
import { useCloseModal } from "@/hooks/useCloseModal";
import React, {
  cloneElement,
  createContext,
  MutableRefObject,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

interface ModalContextModel {
  window: string;
  open: (window: string) => void;
  close: () => void;
}

interface OpenComponent extends React.PropsWithChildren {
  opens: string;
}

interface WindowComponent extends React.PropsWithChildren {
  windowName: string;
  className?: string;
}

interface ModalComponent extends React.FC<React.PropsWithChildren> {
  Open: React.FC<OpenComponent>;
  Window: React.FC<WindowComponent>;
}

const ModalContext = createContext<ModalContextModel | null>(null);

const Modal: ModalComponent = ({ children }) => {
  const [window, setWindow] = useState("");

  const open = (windowName: string) => setWindow(windowName);

  const close = () => setWindow("");

  return (
    <ModalContext.Provider value={{ window, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FC<OpenComponent> = ({ opens, children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Context used outside of its provider!");
  const { open } = context;

  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opens),
  });
};

//#TODO unused
const Close: React.FC<React.PropsWithChildren> = ({ children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Context used outside its provider!");
  const { close } = context;
  return cloneElement(children as React.ReactElement, {
    onClick: () => close(),
  });
};

const Window: React.FC<WindowComponent> = ({
  windowName,
  children,
  className,
}) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Context used outside of its provider!");
  const { window: openedWindow, close } = context;
  const windowRef = useCloseModal(
    close,
    true
  ) as MutableRefObject<HTMLDivElement>;
  if (windowName !== openedWindow) return null;
  return createPortal(
    <div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm duration-300 transition-all">
      <div
        ref={windowRef}
        className={`space-y-12 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-50 p-10 pt-6 ${className}`}
      >
        <button
          className="float-right translate-y-2 translate-x-[0.5rem]"
          onClick={() => close()}
        >
          <IoCloseOutline className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Context used outside of its provider!");
  return context;
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
