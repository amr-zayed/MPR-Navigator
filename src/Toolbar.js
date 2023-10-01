import React, { useEffect, useRef } from 'react';
import styles from './Toolbar.module.css'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

function Toolbar(props) {
    const ref = useRef(null);
    
    useEffect(() => {
        if (ref.current !== null) {
        }
      }, [ref]);

    const toolbarIcons = [
        {
            'id': 'browse-file-icon',
            'image': <FileUploadOutlinedIcon fontSize='medium' />,
            'disabled': false,
            'action': props.onBrowse
        },
        
    ]

    const iconClicked=( id)=>{
        if (id === 'browse-file-icon'){
            ref.current?.click();
        }
    }

    return ( 
    <div className={styles['toolbar']}>
        <button key={"browse-file-icon"} className={styles['circle']} onClick={()=>{iconClicked("browse-file-icon");}}>
                Upload bin file
        </button>
        <input type="file" id="file-browser-dialogue" ref={ref} accept='.bin' hidden onChange={props.onBrowse}/>
    </div> );
}

export default Toolbar;