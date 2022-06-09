import React from 'react'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '20px',
    paddingTop: '10px',
    width: '350px',
    height: '500px',
    zIndex: 1000,
    borderRadius: '10px'
}

const OVERLAY_STYLES ={
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

function Modal(props) {
    if(!props.open) return null
  return (
    <div>
        <div style={OVERLAY_STYLES}/>
        <div style={MODAL_STYLES}>
            {props.children}
        </div>
    </div>
  )
}

export default Modal