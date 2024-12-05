import { Button } from 'react-bootstrap';

export const Buttons = ({type, value, itsClass}) => {

    return (
        <>
            <Button className={itsClass} type={type} variant='light'>{value}</Button>
        </>
    );
};

