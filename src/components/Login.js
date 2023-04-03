import '../login.css'
import banner from '../logo.jpg';
import PatientInfo from './PatientInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Login () {

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // const [errMsg,setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [res, setRes] = useState([]);
  
  
  const  handleLogin = async () => {
  
    await axios.post('https://d8eb-119-161-98-68.in.ngrok.io/doctor/login', {
    
    username : user,
    password :pwd
  })
  .then(function (response) {
    console.log(response.data);
    setRes(response.data);

    //Using windows Storage to redirect from login page
    window.sessionStorage.setItem("doctor_id",JSON.stringify(response.data))
    window.sessionStorage.setItem("isLoggedIn",1)
    
  
    
    //Reload on login
    // window.location.reload(true);
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      
      text: 'Invalid Credentials',
      footer: 'Try again !!'
    })
    

  }); 
  
  }

  // console.log("firstName",res.firstName);

  if(res.type === 'D')
  navigate('/patient_details',{state: {doctor_id:res.doctor_id,firstName:res.firstName,lastName:res.lastName}})
  

  else if(res.type === 'C')
  {
    // window.location.reload()
    navigate('/curator') 
  }


  
  return (
    <>
    <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5 text-center">
  
              <div className="mb-md-5 mt-md-4 pb-5">
  
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
  
                <div className="form-outline form-white mb-4">
                  <input type="username" id="usenameX" className="form-control form-control-lg"  autoComplete="off" 
                        onChange={(e)=>setUser(e.target.value)}
                        value={user}
                        required 
                        placeholder="Username" />
                  <label className="form-label" htmlFor="usernameX">Username</label>
                </div>
  
                <div className="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={(e)=>setPwd(e.target.value)}
                        value={pwd}
                        required 
                        placeholder="Password"/>
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
  
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
  
                <button className="btn btn-outline-light btn-lg px-5" type="click" onClick={ handleLogin}>Login</button>
  
                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                  <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                </div>
  
              </div>
  
              <div>
                <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  );
}

export default Login;


