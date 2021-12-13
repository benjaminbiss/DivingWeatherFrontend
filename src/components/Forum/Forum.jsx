import React, { useState, useEffect } from 'react';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Modal } from 'react-responsive-modal';

const Forum = (props) => {

    const [reviews, setReviews] = useState([]);
    const [replies, setReplies] = useState([]);
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [jwt, setJWT] = useState();
    const [user, userLogged] = useState();
    const [locations, setLocations] = useState();
    const [locationID, setLocationID] = useState(0);
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [reply, setReply] = useState();
    const [reviewID, setReviewID] = useState();
    
    useEffect(() => {
        getJWT();
        getLocations();
        getReviews();
        getUsers();
        getReplies();
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
    }, [page, locationID, reviews, replies])
    useEffect(() => {
        getReplies();
    }, [modal])
    
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

    const getLocations = async () => {
        const locationList = await axios.get(`http://127.0.0.1:8000/locations/`);
        if(locationList) {
            setLocations(locationList.data);
        } else { }
      }

    const getReviews = async () => {
    const reviewList = await axios.get(`http://127.0.0.1:8000/reviews/`);
    if(reviewList) {
        setReviews(reviewList.data);
    } else { }
    }

    const getReplies = async () => {
        const replyList = await axios.get(`http://127.0.0.1:8000/replies/`);
        if(replyList) {
            setReplies(replyList.data);
        } else { }
        }

    const getUsers = async () => {
        const users = await axios.get(`http://127.0.0.1:8000/api/auth/users/`);
        if(users) {
            setUsers(users.data);
        } else { }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        let Reply = {
            'diver_pk': userInfo.id,
            'reply': reply,
            'review_pk': reviewID
        }
        let response = await axios.post(`http://127.0.0.1:8000/replies/`, Reply);
        console.log(response.data);
        if (response) {
            setModal(false);
        }
    }

    function setupModal(review) {
        setModal(true);
        setReviewID(review.id);
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
                    {reviews && users && replies ?
                <table className="table table-hover">
                    <thead>
                        <tr className='table-dark'>
                        <th scope="col">Forum</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    {reviews.map((review) => (
                        review.location_pk === locations[locationID].id ?
                            <tbody>
                                <tr className="table-light">
                                    {users.map((user) => {
                                        if (user.id === review.diver_pk) {
                                            return (
                                                <td>{user.username}'s Review:</td>
                                            )
                                        }                                      
                                    })}
                                <td>{review.review}</td>
                                <td>{review.stars}/5</td>
                                <td><button className="btn btn-primary" onClick={() => setupModal(review)}>Reply</button></td>
                                </tr>
                                {replies.map((reply) => {
                                  if (reply.review_pk === review.id) {
                                      return (
                                        <tr className="table-light">
                                                {users.map((user) => {
                                            if (user.id === reply.diver_pk) {
                                                return (
                                                    <td>{user.username} Replied:</td>
                                                )
                                            }                                      
                                        })}
                                            <td>{reply.reply}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                      )
                                  }  
                                })}
                            </tbody>
                        :
                        <React.Fragment></React.Fragment>
                    ))}
                    </table>
                :
                <div></div>    
                }   
                </div>

            </div>
            <Modal open={modal} onClose={() => setModal(false)} >
                <br />
                <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Write Reply</legend>
                            <div className="form-group">
                                <label className="form-label mt-4">Reply</label>
                                <div className="form-floating mb-3">
                                    <input type="text" 
                                    className="form-control" 
                                    name="reply"
                                    id="floatingInput" 
                                    placeholder="Username" 
                                    onChange={(e) => setReply(e.target.value)}/>
                                    <label for="floatinInput">Reply</label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </fieldset>
                    </form>
            </Modal>
        </div>
     );
}
 
export default Forum;