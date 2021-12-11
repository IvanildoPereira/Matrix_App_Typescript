import React, {useRef} from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES: {} = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000
}

interface ModalProps{
    open: boolean,
    children: React.ReactNode,
}

export default function Modal({ open, children }: ModalProps) {
  
  const dragModal = useRef<HTMLDivElement | null>(null);
  let prevX: number, prevY: number;

  const dragMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {  
    if((e.target as Element).id === "div_moveble"){ 
      dragModal.current = e.currentTarget;
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      prevX = e.clientX;
      prevY = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      // // call a function whenever the cursor moves:
      document.addEventListener('mousemove', elementDrag);
      
    } 
  }

  const elementDrag = (e: MouseEvent) =>{
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    let newX = prevX - e.clientX;
    let newY = prevY - e.clientY;

    prevX = e.clientX;
    prevY = e.clientY;

    dragModal.current!.style.top = (dragModal.current!.offsetTop - newY) + "px";
    dragModal.current!.style.left = (dragModal.current!.offsetLeft - newX) + "px";
  }

  const closeDragElement = () =>{
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }



  if (!open) return null
  
  return ReactDom.createPortal(
    <>
      <div style = {MODAL_STYLES}
        onMouseDown = {(e) => dragMouseDown(e)}
      >
        {children}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}