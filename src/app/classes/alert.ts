import{AlertType} from '../enums/alert-type'
export class Alert {
    text:string;
    type: AlertType;
    constructor(text: string,type=AlertType.Success){
        this.text=text;
        this.type=type;
    }
}
