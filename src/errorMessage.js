export default (error) => {
    let finalError;
    if (error.response) {
        finalError =  error.response.data;
    } else if (error.request) {
        finalError = error.request;
    } else {
        finalError = error.message;
    }

    console.log(finalError)

    if(typeof finalError !== "string") {
        return "שגיאה";
    } else {
        return finalError;
    }
};