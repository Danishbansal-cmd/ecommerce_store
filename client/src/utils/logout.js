import { logoutUser } from "@/store/authslice";
import { useDispatch } from "react-redux";

export function useLogout() {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser())
            .then(() => {
                console.log("User logged out successfully");
                window.location.reload(); // ✅ Ensures complete logout
            })
            .catch(error => console.error("User logging out Error occurred: " + error));
    };

    return logout;
}
