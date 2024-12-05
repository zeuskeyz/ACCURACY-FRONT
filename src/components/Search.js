const { InputGroup, Form } = require("react-bootstrap");


const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <>
            <InputGroup className="">
                <Form.Control placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
        </>

    )
}

export default Search
