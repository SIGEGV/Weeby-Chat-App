import { createContext, useContext,useEffect  ,useState} from 'react';
import { useNavigate } from 'react-router-dom';



const chat= createContext()


const ChatProvider=({children})=>{
  
  const navigate=useNavigate();
      const [user, setUser] = useState()
      useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        
        if (!userInfo && window.location.pathname !== '/Registration') {
          navigate('/');
        }
      }, [navigate]);
    return <chat.Provider value={{user,setUser}}>{children}</chat.Provider>;
}


export const ChatState =()=>{
return useContext(chat);
}

export default ChatProvider