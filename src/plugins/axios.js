import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toastrActions } from "store";
import axios from "axios";

export default function AxiosConfig() {
    const dispatch = useDispatch();
    const [cookie] = useCookies(["token"]);

    const showToastr = (payload) => {
        if (payload.content) {
            dispatch(toastrActions.show_toastr(payload));
            const timer = setTimeout(() => {
                dispatch(toastrActions.hide_toastr());
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    axios.defaults.headers.common["Authorization"] = cookie.token;

    axios.defaults.baseURL =
        process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_BASE_URL_GLOBAL
            : process.env.REACT_APP_BASE_URL_LOCAL;

    axios.defaults.headers["Content-Type"] = "application/json";

    axios.interceptors.response.use(
        function (response) {
            return Promise.resolve(response).then(() => {
                if (response && response.data) {
                    showToastr({
                        type: "success",
                        content: response.data.message,
                    });
                }
                return response;
            });
        },
        function (error) {
            if (error.response && error.response.data) {
                showToastr({
                    type: "error",
                    content: error.response.data.message,
                });
            }
            return Promise.reject(error);
        }
    );
    return <></>;
}
