
class APIError extends Error{

    name: string;
    message: string;
    statusCode: number;

    constructor(name: string, statusCode: number, message: string){
        super();
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }

    logError() {
        let error = {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode
        }

        console.log(error);
    }

    getErrorData(){
        let error = {
            name: this.name,
            message: this.message,
        }

        return error;
    }
}

export default APIError