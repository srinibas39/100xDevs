export default function Navbar({children}:Readonly<{
    children: React.ReactNode;
  }>){
    return <div>
        <div className="p-4 border-b">

        </div>
        {children}
    </div>
}