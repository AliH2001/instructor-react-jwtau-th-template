const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const json = await res.json();
    if (json.token) {
        localStorage.setItem('token', json.token);
      }

      
      if (json.error) {
        throw new Error(json.error);
      }

    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const signin = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();


      if (json.token) {
        localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage
  
        const user = JSON.parse(atob(json.token.split('.')[1]));
  
        return user
      }
      if (json.error) {
        throw new Error(json.error);
      }

    } catch (err) {
      console.log(err);
      throw err;
    }
  };


  const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  }

  const signout = () => {
    localStorage.removeItem('token');
  };
  

  

export {
  signup,
  signin,
  getUser,
  signout
};