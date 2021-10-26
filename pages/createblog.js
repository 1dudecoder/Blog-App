import React from 'react'
import {useEffect,useState} from 'react'
import {v4 as uuidv4} from "uuid"
import {serverTimestamp, storage , db} from "../firebase"
 
function Createblog({user}) {

    const [title,settitle] = useState('');
    const [body,setbody] = useState('');
    const [image,setimage] = useState(''); 
    const [url,seturl] = useState('');  //jo url milega hume firestore se image upload krne k bad

    useEffect(()=>{

        if(url){
            try{
                db.collection("blogs").add({
                    title,
                    body,
                    imageUrl:url,
                    postedBy:user.uid,
                    createdAt:serverTimestamp()
                })
            M.toast({html: "Blog Created",classes:"green"})
            }catch(err){
                M.toast({html: err.message ,classes:"red"})
            }
        }
    },[url])

    const submitdetails = () => {
    
        if(!title || !body || !image ){
            M.toast({html: "please add all the fields",classes:"red"})
            return
        }
                        //creating a folder and setting random name of file where your going to put it 
        var uploadTask = storage.ref().child(`images/${uuidv4()}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if(progress == `100`) M.toast({html: "image uploaded",classes:"green"})
        }, 
        (error) => {
            // Handle unsuccessful uploads
            M.toast({html: error.message , classes:"red"})
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            seturl(downloadURL);
            });
        }
        );

    }

    return (
        <div className="input-field rootdiv">
            <input 
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e)=>{settitle(e.target.value)}} />

            <textarea className="materialize-textarea"
            type="text"
            value={body}
            placeholder="Body"
            onChange={(e)=>{setbody(e.target.value)}} 
            />

            <div className="file-field input-field">
            <div className="btn #3949ab indigo darken-1">
                <span>File</span>
                <input type="file" onChange={e=>{setimage(e.target.files[0])}} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>


            <button onClick={()=>{submitdetails()}} type="submit btn" className="submit btn #3949ab indigo darken-1">Submit post</button>

            <style>{
            `
                .rootdiv{
                    max-width:1200px;
                    padding:20px;
                    text-algin:center;
                    margin-bottom:500px;
                }

                .submit{
                    margin-left: 40vw;
                    margin-top: 20px;
                }
            `
            }</style>

    </div>

            
        </div>
    )
}

export default Createblog
