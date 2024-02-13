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
  
  export default getSender;
  