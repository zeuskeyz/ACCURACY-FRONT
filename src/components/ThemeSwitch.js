import { useContext } from "react";
import { ThemeCreator } from "../context/ThemeContext";

const ThemeSwitch = () => {
    const {dark, setDark} = useContext(ThemeCreator)

    const switchTheme = async () => {
        const page = document.querySelector('body')

        await setDark(!dark)
        await dark ? page.setAttribute('data-bs-theme', 'dark') : page.setAttribute('data-bs-theme', 'light')
    }

    return (
        <>
            <p className='nav-link' onClick={switchTheme}>{!dark ? 'Light Mode?' : 'Dark Mode?'}</p>
        </>
    );
};

export default ThemeSwitch;
