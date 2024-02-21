export const getSender = (loggedUser, user) => {
  try {
      if (!loggedUser || !user || !Array.isArray(user) || user.length < 2) {
        return ''; // or handle the case when data is missing
      }
      
      return loggedUser._id === user[0]._id ? user[1].name : user[0].name;
    } catch (error) {
      console.error('Error in getSender:', error);
      return ''; // or handle the error case
    }
  };

  export const getUser = (loggedUser, user) => {
    try {
        if (!loggedUser || !user || !Array.isArray(user) || user.length < 2) {
          return ''; // or handle the case when data is missing
        }
        
        return loggedUser._id === user[0]._id ? user[1] : user[0];
      } catch (error) {
        console.error('Error in getSender:', error);
        return ''; // or handle the error case
      }
    };

    export const isSameSender=(messages, curr_message, index, userId)=> {
          return(index<messages.length-1 &&
            (messages[index+1].sender._id !==curr_message.sender._id || messages[index+1].sender._id ===undefined )&&
                        (messages[index].sender._id !== userId)
              );
    };
    export const isLastMessage=(messages, i, userId)=>{
         return ( i=== messages.length-1  && 
                    (messages[messages.length-1].sender._id!== userId)&&
                    messages[messages.length-1].sender._id
                    );
    };

    export const isSameSenderMargin = (messages, m, i, userId) => {
      // console.log(i === messages.length - 1);
    
      if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
      )
        return 33;
      else if (
        (i < messages.length - 1 &&
          messages[i + 1].sender._id !== m.sender._id &&
          messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
      )
        return 0;
      else return "auto";
    };
    export const isSameUser = (messages, m, i) => {
      return i > 0 && messages[i - 1].sender._id === m.sender._id;
    };
  
  export default getSender;
  