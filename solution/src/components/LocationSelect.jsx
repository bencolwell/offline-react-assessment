const LocationSelect = ({ locations, handleLocationChanged }) => {
    return (
        <label>
            Location
            <select name="location" onChange={(e) => handleLocationChanged(e.target.value)}>
                {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>
        </label>
    )
};

export default LocationSelect;
