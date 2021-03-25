import { useEffect, useContext } from "react";
import UserContext from "./Context/UserContext";

const IsAuth = () => {
	const { userData } = useContext(UserContext);
	useEffect(() => {
		if (!userData.user) history.push("/login");
	}, [userData.user, history]);

	return;
};

export default IsAuth;
