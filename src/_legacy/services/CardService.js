import _BaseService from "./_BaseService";
import {Card} from "../models/dataModels/dataModelsRegistry";
import DataService from "./dataAccess/DataService";



class CardService extends _BaseService {

    constructor() {
        super(Card);
    }
}

export default CardService;