import React from 'react'
import {db} from '../../firebase'
import {useState} from "react"
import { useRouter } from 'next/router'


export default function Blogpage({blog,user,allcomment}) {

    const router =  useRouter()
    const { blogs } = router.query
    const[mycomment,setmycomment] = useState("");
    //for getting new message when user click 
    const[allcommentsblog,setallcommentblogs] = useState(allcomment);

    //commmenting option
    const makecomment = async (e)=>{
        // console.log(user);
        // console.log(blogs);
        // console.log(mycomment);

        await db.collection('blogs').doc(blogs).collection('comments').add({
            text:mycomment,
            name:user.displayName
        })
        const commentsquery = await db.collection('blogs').doc(blogs).collection('comments').get(); 
        setallcommentblogs(commentsquery.docs.map(docSnap=>docSnap.data())) ;
    } 

    

    // console.log(blog);
    
    return (
        
        <div className="container center">
        <h2>{blog.title}</h2>
        <h4>Create on - {new Date(blog.createdAt).toDateString()} </h4>
        <img src={blog.imageUrl} alt="blog title" />
        <h6>{blog.body}</h6>
        <hr/>
        <div className="comments">
            {
                allcommentsblog.map(item =>{
                    return ( <h6 key={item.text}><span>{item.name}:- </span> {item.text} </h6> )
                })
            }

            {
            user? <><div className="input-field">
            <input type="text" value={mycomment} placeholder="add a comment"
            onChange={(e)=>{setmycomment(e.currentTarget.value)}}>
            </input>
        </div>

        <button type="submit btn" className="btn #1e88e5 blue darken-1" 
        onClick={(e)=>{
            makecomment(e)
        }}
        >comment</button> </> : <h3>please login to make comment</h3>
            }
        </div>
        <style > {

        ` 
        .comments{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: left;
        }

        h6 > span {
            color:red;
        }

        .comments h6{
            color:black;
        }

        body{
            color:orange
        }

        img{
            width: 100%;
            max-width:500px
        }

        h4{
            color:black
        }
        `
        } 
        </style>

        </div>
    )
}



export async function getServerSideProps({params:{blogs}}) {  //destructoring her
    
    // console.log(blogs);
    //you will see here the params id in serverside in console
    const result = await db.collection('blogs').doc(blogs).get()    
    //bhut sare doc ayenyge 1 reqest mai to snapshot or usme map lagangye
    const allcommentsSnap = await db.collection('blogs').doc(blogs).collection('comments').get() 
    const allcomment = allcommentsSnap.docs.map(comDocSnap => comDocSnap.data())
    

    // console.log(result.data());

    return {
      props: {
        blog: {
            ...result.data(),
            createdAt:result.data().createdAt.toMillis()
        },
        allcomment

      }, // will be passed to the page component as props
    }
  }



  