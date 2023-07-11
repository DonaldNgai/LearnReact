import {useCallback, useState} from 'react';
import logo from './logo.svg'; // Give logo a link from a variable
import './App.css';

// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone"
// Import cuid which allows easy Unique ID generation
import cuid from "cuid"

let acceptedFormats = 'application/pdf, image/*';
// Create a state called images using useState hooks and pass the initial value as empty array
// States are important in react as it tells when the DOM model gets
// Re-rendered. It rerenders when a state changes


const Image = ({ image }) => {
    return (
        <div className="file-item">
            <img alt={'img - ${image.id}'} src={image.src} className="file-img" />
        </div>
    );
};

const ImageList = ({ images }) => {
      // render each image by calling Image component
    const renderImage = ( image, index ) => {
        return(
            <Image image={image} key={'${image.id}-image'}/>
        );
    };

    // Return the list of files
    return (
        <section className="file-list">
            {images.map(renderImage)}
        </section>
    );
};

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

function handleOnDrop(acceptedFiles, images, setImages)
{
    acceptedFiles.map(file => {
        // Initialize FileReader Browser API
        const reader = new FileReader();
        // This callback function gets called
        // after the file is read
        reader.onload = function (e)
        {
            // add the image into the state. 
            // Since FileReader reading process is asynchronous, 
            // its better to get the latest snapshot state (i.e., prevState) 
            // and update it. 
            setImages(prevState => [ ...prevState, { id: cuid(), src: e.target.result }]);
            
            // Read the file as Data URL (since we accept only images)
            reader.readAsDataURL(file);
            return file;
        };
    }, []);
}

function DropAudioApp(){
    const [images, setImages] = useState([]); 

    const onDrop = useCallback(acceptedFiles => {
        // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
        console.log(acceptedFiles);
        handleOnDrop(acceptedFiles, images, setImages);
    }, []);

    // We pass onDrop function and accept prop to the component. It will be used as initial params for useDropzone hook
    return (
        <main className="App">
            <h1 className="text-center">Drag and Drop Example</h1>
            <Dropzone onDrop={onDrop} accept={acceptedFormats} />
            <ImageList images={images} />
        </main>
    );
};

export default DropAudioApp;
