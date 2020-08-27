import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const middleware:any[] = [bodyParser.json(), cookieParser()]

export default middleware;
