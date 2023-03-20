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
    let text = document.getElementById('myBox');
    text.select();
    navigator.clipboard.writeText(text.value);
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
            <h1 style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>{props.heading}</h1>
            <div className="mb-3">
                <textarea className='form-control' id='myBox' rows='8' value={text} onChange={handleOnChange} style={{backgroundColor: props.mode === 'dark' ? 'grey' : 'white', color: props.mode === 'dark'?'white':'#042743'}}>

                </textarea>
            </div>
            <button className='btn btn-primary mx-2' onClick={handleUpperCase} >Convert to UpperCase</button>
            <button className='btn btn-primary mx-2' onClick={handleLowerCase} >Convert to LowerCase</button>
            <button className="btn btn-primary mx-2" onClick={handleSpeak} >Speak</button>
            <button className="btn btn-primary mx-2" onClick={handleCopy} >Copy Text</button>
            <button className="btn btn-primary mx-2" onClick={handleExtraSpaces} >Remove extra spaces</button>
            <button className='btn btn-secondary mx-2' onClick={handleClearText} >Clear Text</button>
        </div>

        <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
            <h2>Your Text Summary</h2>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length > 0 ? text : 'Enter something in the textbox above to preview it here'}</p>
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
