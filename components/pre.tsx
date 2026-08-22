import { Copy } from "lucide-react"
import toast from "react-hot-toast"

// export const Pre = ({code}:{code:string})=>{
// return    <pre className="bg-white mt-3  whitespace-pre-wrap break-words px-5 rounded-md">

//             {code}


//         </pre>
// }

export const Pre = ({ code }:{code:string}) => (
  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto border border-gray-700">
        {/* <div className="pt-5"> */}
        
        
        <Copy className="ml-auto hover:text-primary cursor-pointer active:scale-120"  color="white" width={14} onClick={()=>{
        navigator.clipboard.writeText(code)
        toast.success("Copied to clipboard")
    }}/>
    
    
    {/* </div> */}
    <pre className="text-green-400 text-sm font-mono whitespace-pre whitespace-pre-wrap break-words">
      <code>{code.trim()}</code>
    </pre>
  </div>
);