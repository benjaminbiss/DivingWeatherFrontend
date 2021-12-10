import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChecklistView = (props) => {

    const navigate = useNavigate();
    const [checklist_1, setchecklist_1] = useState(props.trip.checklist_1);
    const [checklist_2, setchecklist_2] = useState(props.trip.checklist_2);
    const [checklist_3, setchecklist_3] = useState(props.trip.checklist_3);
    const [checklist_4, setchecklist_4] = useState(props.trip.checklist_4);
    const [checklist_5, setchecklist_5] = useState(props.trip.checklist_5);
    const [checklist_6, setchecklist_6] = useState(props.trip.checklist_6);
    const [checklist_7, setchecklist_7] = useState(props.trip.checklist_7);
    const [checklist_8, setchecklist_8] = useState(props.trip.checklist_8);

    function refreshPage() {
        window.location.reload();
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updateTrip = {
            'trip_name': props.trip.trip_name,
            'date': props.trip.date,
            'checklist_1': checklist_1,
            'checklist_2': checklist_2,
            'checklist_3': checklist_3,
            'checklist_4': checklist_4,
            'checklist_5': checklist_5,
            'checklist_6': checklist_6,
            'checklist_7': checklist_7,
            'checklist_8': checklist_8,
        }
        console.log('prop', props.trip)
        let response = await axios.put(`http://127.0.0.1:8000/trips/${props.trip.id}/`, updateTrip);
        console.log(response.data);
        navigate('/trips');
        refreshPage();
    }

    return ( 
        <div className="container">
        <div className="checklist-container">
            <form id="flexCheckDefault" onSubmit={handleSubmit}></form>
            <table className="table table-hover">
                <thead>

                    <tr className="table-dark">
                        <th scope="col">Task</th>
                        <th scope="col">Description</th>
                        <th scope="col">Steps</th>
                        <th scope="col">Status</th>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Location</th>
                        <td>Have you picked your desired diving location?</td>
                        <td>If not, use our interactive map to find a suitable location!</td>
                        <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_2(!checklist_2)}>{checklist_2 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-active">
                        <th scope="row">Weather</th>
                        <td>Have you read the weather report for your desired location?</td>
                        <td>If not, use our interactive map to study the weather patterns at your dive location!</td>
                        <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_3(!checklist_3)}>{checklist_3 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">BCD and Bouyancy</th>
                        <td>To check if you have a functional BCD, here are the steps that you should perform:</td>
                        <td>Check your buddy’s buoyancy compensator.
                            Check if you’ve connected the low-pressure inflator hose correctly on your BCD and ensure a less sticky inflator button with a quick puff.
                            Make sure that your BCD deflates correctly by deflating it.
                            Make sure that you have the proper weight by checking your buoyancy. This step will only apply if you’re checking your dive equipment in the water.</td>
                            <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_4(!checklist_4)}>{checklist_4 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-active">
                        <th scope="row">Weights/Weight Belt</th>
                        <td>For weight belt checks, it’s best to perform the tasks listed below.</td>
                        <td>Check if your buddy is wearing their weight belt properly. Ensure that loose ends are tied correctly and tucked in such a way that enables quick release.
                            Familiarize yourself with your dive buddy’s preferred weight belt or built-in weights and how you can release them when a specific emergency calls for it.</td>
                            <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_5(!checklist_5)}>{checklist_5 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Release</th>
                        <td>Once you’ve checked your BCD and weight belt, performing a release check is your next step. The following steps should be enough for you to conduct one:</td>
                        <td>Check if your buddy has strapped their BCD correctly and tightened all belts.
                            Count the number of buckles/straps tugging at each one as you enter the water.
                            Ensure that hose or diving gear placement won’t keep you and your buddy from removing your gear in emergencies.
                            Teach your buddy how to open the release.</td>
                            <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_6(!checklist_6)}>{checklist_6 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-active">
                        <th scope="row">Air</th>
                        <td>Air supply checks are also necessary before diving. Unfortunately, there are times where divers forget why they should perform this particular step. But it doesn’t mean you should do the same. Here are a few ways to check for proper air supply:</td>
                        <td>Check if your buddy’s air is fully turned on.
                            Make him take a couple of breaths while you watch the pressure gauge for fluctuations in the needle, or simply purge the regulator while watching the needle.
                            Make sure that you have a full tank and check if your air connectors are leaking.
                            For alternate air source checking, breathe from it a few times. You’ll also need to make sure that your buddy has clipped the source on their BCD and that you can see it while you dive.</td>
                            <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_7(!checklist_7)}>{checklist_7 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <th scope="row">Final OK</th>
                        <td>Lastly, we have the final OK. This last step lets you perform the following steps:</td>
                        <td>Inspect your fins, mask, and snorkel with your eyes.
                            Test dive flashlights, if necessary.
                            Take a compass bearing.
                            Check your dive computer before giving your buddy the all-OK sign to start your dive.
                            Attach loose hoses and other dangly items (which can cause reef damage) to your suit.</td>
                            <td><fieldset className="form-group">
                        <legend className="mt-4"></legend>
                        <div className="form-check">
                        <button className="btn btn-primary" onClick={() => setchecklist_8(!checklist_8)}>{checklist_8 === false ? "Incomplete" : "Complete"}</button>
                        </div>
                        </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                        <button type="submit" form="flexCheckDefault" className="btn btn-primary">Submit</button>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
        </div>
     );
}
 
export default ChecklistView;

