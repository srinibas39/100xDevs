
interface DocsProps{
    params:{
        slug:string[]
    }
}

export default async function Docs({params}:DocsProps){
    const docs = (await params).slug
    console.log("docs",docs)
    return <div>
        <h1>This is cathc all segemnt</h1>
        <div>{JSON.stringify(docs)}</div>
    </div>
}