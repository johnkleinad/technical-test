import { useEffect, useState } from "react";

const UseDarkTheme = () => {
    const [theme, setTheme] = useState();
    useEffect(() => {
        if(!localStorage.theme){
            document.body.classList.remove('dark')
            localStorage.theme = 'light'
            return
        }
        if(localStorage.theme == 'dark') {
            document.body.classList.add('dark')
            setTheme('dark') 
            return
        }
        if(localStorage.theme == 'light') {
            document.body.classList.remove('dark')
            setTheme('light') 
            return
        }
    }, [])
    const handleTheme = () => {
        if (localStorage.theme == 'dark') {
            setTheme('light')
            document.body.classList.remove('dark')
            localStorage.theme = 'light'
            return
        }
        if (localStorage.theme == 'light') {
            setTheme('dark')
            document.body.classList.add('dark')
            localStorage.theme = 'dark'
            return
        }
        localStorage.theme = 'dark'
    }
    return {
        theme,
        handleTheme
    };
}
export default UseDarkTheme;
