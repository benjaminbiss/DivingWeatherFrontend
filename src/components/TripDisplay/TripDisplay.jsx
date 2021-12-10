import TripCard from "../TripCard/TripCard";

const TripDisplay = (props) => {
    return (
        <div className="row row-cols-4">
            {props.trips.map((trip) => {
                return <TripCard trip={trip} />;
            })}
        </div>
    );
};

export default TripDisplay;
