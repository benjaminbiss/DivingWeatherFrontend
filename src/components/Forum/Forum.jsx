import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Forum = (props) => {

    const [reviews, setReviews] = useState();
    const [replies, setReplies] = useState();
    const [users, setUsers] = useState();
    const [jwt, setJWT] = useState();
    const [user, userLogged] = useState();
    const [userInfo, setUserInfo] = useState();
    const [locations, setLocations] = useState();
    const [locationID, setLocationID] = useState(0);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        getJWT();
        getLocations();
        getReviews();
    }, [])
    useEffect(() => {
        getUser();
    }, [jwt])
    useEffect(() => {
        if (user){
          getUserInfo();
        }
    }, [user])
    useEffect(() => {
    }, [page, locationID])
    
    function getJWT() {
        const jwt = localStorage.getItem('token');
        setJWT(jwt);        
    }
    function getUser() {
        try{
            const user = jwtDecode(jwt);
            userLogged(user);
        } catch {}
    }
  
    const getUserInfo = async () => {
      let pk = user.user_id;
      const userInfo = await axios.get(`http://127.0.0.1:8000/api/auth/user/${pk}`, { headers: { Authorization: `Bearer ${jwt}` } });
      if(userInfo) {
          setUserInfo(userInfo.data);
      } else {console.log('no user found')}
    }
    
    function refreshPage() {
      window.location.reload();
    }

    const getLocations = async () => {
        const locationList = await axios.get(`http://127.0.0.1:8000/locations/`);
        if(locationList) {
            setLocations(locationList.data);
        } else { }
      }

    const getReviews = async () => {
    const locationList = await axios.get(`http://127.0.0.1:8000/reviews/`);
    if(locationList) {
        setReviews(locationList.data);
    } else { }
    }

    return ( 
        <div>
            <NavBar />
            <div className='container'>
                <div className='table-container'>
                    {locations ?
                    <h1>{locations[locationID].name}</h1>
                    :
                    <h1>Loading...</h1>
                    }
                    {page === 1 ?
                    <ul class="pagination">
                    <li class="page-item disabled">
                    <a class="page-link" >&laquo;</a>
                    </li>
                    {locationID === 0 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(0)}>1</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(0)}>1</a>
                    </li>
                    }
                    {locationID === 1 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(1)}>2</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(1)}>2</a>
                    </li>
                    }
                    {locationID === 2 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(2)}>3</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(2)}>3</a>
                    </li>
                    }
                    {locationID === 3 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(3)}>4</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(3)}>4</a>
                    </li>
                    }
                    {locationID === 4 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(4)}>5</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(4)}>5</a>
                    </li>
                    }
                    <li class="page-item">
                    <a class="page-link" onClick={() => setPage(2)}>&raquo;</a>
                    </li>
                    </ul>
                    : page === 2 ?
                    <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" onClick={() => setPage(1)}>&laquo;</a>
                    </li>
                    {locationID === 5 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(5)}>6</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(5)}>6</a>
                    </li>
                    }
                    {locationID === 6 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(6)}>7</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(6)}>7</a>
                    </li>
                    }
                    {locationID === 7 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(7)}>8</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(7)}>8</a>
                    </li>
                    }
                    {locationID === 8 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(8)}>9</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(8)}>9</a>
                    </li>
                    }
                    {locationID === 9 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(9)}>10</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(9)}>10</a>
                    </li>
                    }
                    <li class="page-item">
                    <a class="page-link" onClick={() => setPage(3)}>&raquo;</a>
                    </li>
                    </ul>
                    :
                    <ul class="pagination">
                    <li class="page-item ">
                    <a class="page-link" onClick={() => setPage(2)}>&laquo;</a>
                    </li>
                    {locationID === 10 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(10)}>11</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(10)}>11</a>
                    </li>
                    }
                    {locationID === 11 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(11)}>12</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(11)}>12</a>
                    </li>
                    }
                    {locationID === 12 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(12)}>13</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(12)}>13</a>
                    </li>
                    }
                    {locationID === 13 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(13)}>14</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(13)}>14</a>
                    </li>
                    }
                    {locationID === 14 ?
                    <li class="page-item active">
                    <a class="page-link" onClick={() => setLocationID(14)}>15</a>
                    </li>
                    :
                    <li class="page-item">
                    <a class="page-link" onClick={() => setLocationID(14)}>15</a>
                    </li>
                    }
                    <li class="page-item">
                    <a class="page-link disabled">&raquo;</a>
                    </li>
                    </ul>
                    }
                <table className="table table-hover">
                    <thead>
                        <tr className='table-dark'>
                        <th scope="col">User</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-primary">
                        <th scope="row">Primary</th>
                        <td>Column content</td>
                        <td>Column content</td>
                        </tr>
                        <tr className="table-light">
                        <th scope="row">Light</th>
                        <td>Column content</td>
                        <td>Column content</td>
                        </tr>
                    </tbody>
                    </table>
                </div>

            </div>
        </div>
     );
}
 
export default Forum;