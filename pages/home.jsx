import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then(console.log)

    }, [])
    return <>

    </>
}
export default Home;