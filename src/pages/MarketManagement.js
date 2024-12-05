import FlexibleTable from '../components/FlexibleTable';

const MarketManagement = () => {
    const addButton = {
        path: '/markets/new',
        text: 'Add Market',
        icon: "bi bi-house-add-fill"
    }

    const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Owner', key: 'owner' },
        { header: 'Seller', key: 'seller' },
        { header: 'Branch', key: 'branchCode' }
    ]

    const dataPath = "/markets"; const editPath = "/markets/edit"; const deletePath = "/markets"
    return (
        <div>
            <FlexibleTable columns={columns} dataPath = {dataPath} editPath = {editPath} deletePath = {deletePath} button={addButton} />

        </div>
    )
}

export default MarketManagement
