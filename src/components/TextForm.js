import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function TextForm(props) {

  const [text, setText] = useState('');

  const handleUpperCase = () => {
    setText(text.toUpperCase())
    props.showAlert('Converted to uppercase!', 'primary');
  }

  const handleLowerCase = () => {
    setText(text.toLowerCase())
    props.showAlert('Converted to lowercase!', 'primary');
  }

  const handleClearText = () => {
    setText('');
    props.showAlert('Text Cleared!', 'primary');
  }

  const handleSpeak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  } 
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert('Copied to clipboard!', 'primary');
  } 

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert('Extra spaces removed!', 'primary');
  } 

  const handleOnChange = (event) => {
    // console.log(event.target.value)
    setText(event.target.value)
  }

  return (
    <>
        <div style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
            <h1 className='mb-4' style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>{props.heading}</h1>
            <div className="mb-3">
                <textarea className='form-control' id='myBox' rows='8' value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark' ? 'rgb(36 74 104)' : 'white', color: props.mode === 'dark'?'white':'#042743'}}>

                </textarea>
            </div>
            <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleLowerCase} >Convert to LowerCase</button>
            <button disabled={text.length === 0} className='btn btn-primary mx-1 my-1' onClick={handleUpperCase} >Convert to UpperCase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSpeak} >Speak</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy} >Copy Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces} >Remove extra spaces</button>
            <button disabled={text.length === 0} className='btn btn-secondary mx-1 my-1' onClick={handleClearText} >Clear Text</button>
        </div>

        <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
            <h2>Your Text Summary</h2>
            <p>{text.split(/\s+/).filter((element)=> { return element.length !== 0 }).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").filter((element)=> { return element.length !== 0 }).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length > 0 ? text : 'Nothing to preview!'}</p>
        </div>
    </>
  )
}

TextForm.propTypes = {
    heading: PropTypes.string.isRequired
}

TextForm.defaultProps = {
    heading: 'Enter text below'
}
