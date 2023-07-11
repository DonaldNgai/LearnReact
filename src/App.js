import {useCallback} from 'react';
import logo from './logo.svg'; // Give logo a link from a variable
import './App.css';

// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";
// Import cuid which allows easy Unique ID generation
import cuid from "cuid"

let acceptedFormats = 'application/pdf, image/*';

const Dropzone = ({ onDrop, accept }) => {
    // Initializing useDropzone hooks with options
    // Hooks exposed by useDropZone. Need to pass it a callback function. so we pass onDrop

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    /* useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean  */

    return (
        <div className="dropzone-div" {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                  <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                  <p className="dropzone-content">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
            </div>
        </div>
    );

};

function handleOnDrop(acceptedFiles)
{
    acceptedFiles.map(file => {
        // Initialize FileReader Browser API
        const reader = new FileReader();
        
    });
}

function DropAudioApp(){
    const onDrop = useCallback(acceptedFiles => {
        // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
        console.log(acceptedFiles);
        handleOnDrop(acceptedFiles);
    }, []);

    // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
    return (
        <main className="App">
            <h1 className="text-center">Drag and Drop Example</h1>
            <Dropzone onDrop={onDrop} accept={acceptedFormats} />
        </main>
    );
};

export default DropAudioApp;
