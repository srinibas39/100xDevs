import { ReactNode } from "react";

export default function PageRoot({children} : {
    children:React.ReactNode
}){
    return <div>
        <div>NavBar</div>
        {children}
        <div>Footer</div>
    </div>
}