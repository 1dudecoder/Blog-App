import {db} from "../firebase"
import Link  from "next/link"
import {useState} from "react"

export default function Home({Allblogs}) {
  // console.log(Allblogs);
  const [blogs,setblogs] = useState(Allblogs)
  const[end,setEnd] = useState(false)   //for creaking if we reach to the bottom dont show loadmore btn option to the user
  
  //startafter m last wale ka snapshort bhejna hota hai pagination k liye so humne jo data store kiya tha usestate m humne
  //use nikal k use k liye total blogs.lenght-1 kr k 
  //startafter means ab khn se start krna hai bhejna
  
  const loadMore = async ()=>{
    const last  = blogs[blogs.length-1]
    const res = await db.collection('blogs')
    .orderBy('createdAt','desc')
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()

    
    const newblogs = res.docs.map(docSnap=>{
      return {
       ...docSnap.data(),
       createdAt:docSnap.data().createdAt.toMillis(),
       id:docSnap.id
     }
    })

    setblogs(blogs.concat(newblogs))

    if(newblogs.length < 3){
      setEnd(true)
    }
  }

  return (

    <div className="center">
    {
      blogs.map( blog => <> 
        <div className="card" key={blogs.title} >
        <div className="card-image">
          <img src={blog.imageUrl} />
          <span className="card-title">{blog.title}</span>
        </div>
        <div className="card-content">
          <p>{blog.body}</p>
        </div>
        <div className="card-action">
        <Link href={`/blogs/${blog.id}`}><a>Read More</a></Link>
        </div>
      </div>
       </> 
       )
    }

    {
      end==false?  
      <button onClick={()=>{loadMore()}} className="submit btn #ff9800 orange">Load More</button>
      : <h4>You reached End !</h4>
    }

    </div>
  )
}

export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy('createdAt',"desc").limit(3).get()
  const Allblogs = querySnap.docs.map(docsSnap=>{
    return{
      //here we are facasing a problem in json file createdat was not in proper format of json
      //so next js cry to solve the we did array destructing here and change that timestamp to millisec which has has json bad format to good one
      //so we are storeing all new value to Allblogs
      ...docsSnap.data(),
      createdAt : docsSnap.data().createdAt.toMillis(),
      id: docsSnap.id

    }
  })

  return {
    props: {Allblogs}, // will be passed to the page component as props
  }
}
