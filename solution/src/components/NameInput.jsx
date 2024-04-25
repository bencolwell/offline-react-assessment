const NameInput = ({ name, isLoading, data, handleNameChanged }) => {
    const isInvalid = name.length > 0 && !isLoading && !data;

    return (
        <>
            <label>
                Name
                <input type="text" name="name" value={name} onChange={(e) => handleNameChanged(e.target.value)} />
            </label>
            {isInvalid && (
                <p>this name has already been taken</p>
            )}
        </>
    )
};

export default NameInput;
