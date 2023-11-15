import {useEffect, useState} from "react";

const useMatchServer = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return mounted;
};

export default useMatchServer;