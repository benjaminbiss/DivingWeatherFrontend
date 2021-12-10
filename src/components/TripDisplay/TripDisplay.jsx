import TripCard from "../TripCard/TripCard";

const TripDisplay = (props) => {
    return (
        <div className="row row-cols-6">
            {props.trips.map((trip) => {
                return <TripCard trip={trip} />;
            })}
        </div>
    );
};

export default TripDisplay;
