import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export default function Loading() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(!user){
                navigate('/sign-in')
            } else {
                navigate('/main')
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <p>로딩중</p>
        </div>
    )
}