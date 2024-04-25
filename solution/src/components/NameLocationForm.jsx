import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getLocations, isNameValid } from '../mock-api/apis.js';

import styles from './NameLocationForm.module.css';

import NameInput from './NameInput.jsx';
import LocationSelect from './LocationSelect.jsx';

const NameLocationForm = () => {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        async function getData() {
            await getLocations().then((res) => {
                setLocations(res);
                setLocation(res[0]);
            }).catch((err) => console.log(err));
        }
        getData();
    }, []);

    const {
        isLoading,
        data
    } = useSWR(
        name.length > 0 ? name : null,
        isNameValid
    )

    const handleNameChanged = (value) => {
        setName(value);
    };

    const handleLocationChanged = (value) => {
        setLocation(value);
    }

    const handleClearClicked = () => {
        setListItems([]);
    }

    const handleAddclicked = () => {
        setListItems([
            ...listItems,
            {name: name, location: location}
        ]);
    }

    const isAddEnabled = !isLoading && data && location !== "";

    return (
        <div className={styles.form}>
            <div>
                <NameInput
                    name={name}
                    isLoading={isLoading}
                    data={data}
                    handleNameChanged={handleNameChanged}
                />
            </div>
            <div>
                <LocationSelect
                    locations={locations}
                    handleLocationChanged={handleLocationChanged}
                />
            </div>
            <div>
                <button onClick={handleClearClicked}>Clear</button>
                <button onClick={handleAddclicked} disabled={!isAddEnabled}>Add</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? styles.trgrey : null}>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NameLocationForm;
