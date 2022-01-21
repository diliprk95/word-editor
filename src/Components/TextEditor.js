import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./TextEditor.css"

export default function TextEditor(props) {
    const MAX_LENGTH = 800;
    const [text,setText] = useState('')
    
    const [isReadMore, setIsReadMore] = useState(true);
    
    const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
    };

    const handelUpClick = () =>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to UPPERCASE!","success");
    }
    
    const handelLoClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!","success");
    }

    const handelSentanCaseClick = () =>{
        let removeWhitespace  = document.getElementById('textArea').value.trimStart();
        let newText = removeWhitespace.charAt(0).toUpperCase() + removeWhitespace.slice(1);
        setText(newText);
        props.showAlert("Converted to Sentance case!","success");
    } 
    
    const handelCopyClick = () =>{
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!","success");
    }

    const handelExtraSpaceClick = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra Spaces Removed!","success");
    }

    const handelClearClick = () =>{
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!","success");
    }
    
    // const handelCapitCaseClick = () =>{
    //     let removeWhitespace  = document.getElementById('textArea').value.trimStart();
    //     let splitText = []
    //     splitText = removeWhitespace.split(' ');
    //     for (let index = 0; index < splitText.length; index++) {
    //         //const element = splitText[index];
    //         let newText = splitText[].charAt(0).toUpperCase(); // .charAt(0).toUpperCase() + splitText.slice(1);
    //         setText(newText)
    //     }
    // }
    
    const handleOnChange = (event) =>{
        setText(event.target.value);
    }
    return (
        <>  
        <div className="container" style={{color: props.mode==='dark'?'white':'#00101C'}}>        
            <h4>{props.label}</h4>
            <div className="mb-6 textwidth">
                <textarea className="form-control my-2 border" value={text} onChange={handleOnChange} 
                  style={{backgroundColor: props.mode==='dark'?'#00101C':'white', color: props.mode==='dark'?'white':'#00101C'}} id="textArea" rows="8"></textarea>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelUpClick}>UPPERCASE</button>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelLoClick}>lowercase</button>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelClearClick}>Clear</button>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelCopyClick}>Copy to Clipboard</button>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelExtraSpaceClick}>Remove Extra Space</button>
                <button type="button" disabled={text.length === 0} className="btn btn-primary btn-sm mx-1 my-1 bgcolor" onClick={handelSentanCaseClick}>Sentance Case</button>
                {/* <button type="button" className="btn btn-primary mx-1" onClick={handelCapitCaseClick}>Capitalized Case</button> */}
            </div>
        </div>
        <div className="section-media">
        <section style={{color: props.mode==='dark'?'white':'black', border: props.mode==='dark'?'white':'#183d72 solid 1px'}}>
            <div className="ib"> 
                <h4 className="align">Text Summary</h4>
                <p className="padding-left">{text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} words | {text.length} characters</p>
                <p className="padding-left">{0.008 * text.split(' ').filter((element)=>{return element.length !== 0}).length} minutes to read slow</p>
                <p className="padding-left">{0.0022 * text.split(' ').filter((element)=>{return element.length !== 0}).length} minutes to read fast</p>
            </div>
            <div className="ib">
                <h4 className="align">Preview</h4>
                <p className="text"> 
                    {isReadMore ? text.slice(0, MAX_LENGTH) : text}
                    {text.length === 0 ?  "Noting to preview!" : '' }
                    {text.length > MAX_LENGTH ? <span onClick={toggleReadMore} className="read-or-hide">
                    {isReadMore ? "...read more" : " show less"}
                    </span> : ''}
                </p>
            </div>
        </section>
        </div>
        </>
    )
}

TextEditor.propTypes = {
    label: PropTypes.string.isRequired
  }

  TextEditor.defaultProps = {
    label: 'Set label here',
}
