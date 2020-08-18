import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';


const middleware:any[] = [bodyParser.json(), cookieParser()]

export default middleware;
