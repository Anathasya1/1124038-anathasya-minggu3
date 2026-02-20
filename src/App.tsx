import { useState } from 'react'
import { isEmail } from './utils/isEmail'; //click import aja nanti
// import { ToDo } from './ToDo';
import { LearningHooks } from './LearningHooks';
import PostList from './pages/PostListPage';


//pake .tsx biar bisa ada tag htmlnya
//importnya perfile ga bisa langsung satu paket

// function App(){
//   return<LearningHooks/>
// }

function App() {
  
  const[email, setEmail] = useState(''); //useState: ini buat nyimpan kondiis sebuah nilai
  //email: itu valuenya, setEmail: buat ganti valuenya
  const[password, setPassword] = useState('');
  const[isLoggedIn, setIsLoggedin] = useState(false);

  return<PostList></PostList>
  

  const login = async () => { //ini fungsi, bisa pake parameter
    if (!isEmail(email)) {
      alert("invalid email");
    }
    // if (password.length < 8) {
    //   alert("password nust be at least 8 char")
    // }
    const response = await fetch('http://localhost:5173/api/auth/login', {
      method: 'POST',
      headers: {
        "content-type": "application/json" //wajib ada
      },
      body: JSON.stringify({
        email,
        password,
      })
    })

    if (response.status !== 200) {
      const data = await response.json();
      alert('Login Failed' + JSON.stringify(data));
      return;
    }
    setIsLoggedin(true);
    //alert(`loging in for ${email}`);
    //alert("Email: " + email + " Password: " + password); //ini buat munculin alertnya gitu, alert bisa berlapis jadi tinggal bikin aja dibawahnya
  }

  const logout = () => {
    setIsLoggedin(false);
    setEmail('');
    setPassword('');
  }

  //ini pindah page
  if (isLoggedIn) {
    return <div>
      <div>Hello, {email}</div>
      {/* <ToDo/> */}
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  }

  return (
    <div>
      <h4>Login</h4>
      <div>
        <div>
          <p>Email</p>
          <input type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Login</button>
      </div>
      <br/>
      <div>Email: {email} </div> 
      {/* buat nunjukin aja*/}
      <div>Password: {password} </div>
    </div>
  )
}

export default App
