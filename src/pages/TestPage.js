import { useState } from "react";
import { FormInput } from "../components/FormInput";
import { FormHeader } from "../components/FormHeader";

const TestPage = () => {
    const [formData, setFormData] = useState({
        number: "",
        market: "",
        seller: "",
        items: [{ phone: "", serials: "", status: "Allocated" }],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData((prevState) => ({
            ...prevState,
            items: newItems,
        }));
    };

    const handleSerialsInput = (index, value) => {
        const cleanedValue = value.replace(/,\s*/g, "");
        const characters = cleanedValue.split("");
        const formattedValue = characters.reduce((acc, char, i) => {
            if (i > 0 && i % 15 === 0) {
                return `${acc},${char}`;
            }
            return acc + char;
        }, "");

        handleItemChange(index, "serials", formattedValue);
    };

    const addItem = () => {
        setFormData((prevState) => ({
            ...prevState,
            items: [
                ...prevState.items,
                { phone: "", serials: "", status: "Allocated" },
            ],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Here you would typically send the data to your server
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                                <FormHeader text='NEW ALLOCATION' path='/allocations' />

                                <form onSubmit={handleSubmit} className="space-y-4">

                                    <FormInput label='Allocation No. ' type="text" name="number" value={formData.number} onChange={handleInputChange} required />
                                    <FormInput label="Destination Market" type='select' name="market" value={formData.market} onChange={handleInputChange} required />

                                    <div>
                                        <h4 className="font-semibold mb-2">Serials</h4>
                                        {formData.items.map((item, index) => (
                                            <div key={index} className="border p-4 my-2 rounded-md">

                                                <FormInput label="Phone Type" type='select' name="phone" value={item.phone} onChange={(e) => handleItemChange(index, 'phone', e.target.value)} required />
                                                <FormInput label="Enter Serials" type='text' name="serials" value={item.serials} onChange={(e) => handleSerialsInput(index, e.target.value)} required />

                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                    >
                                        Add Item
                                    </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestPage;
