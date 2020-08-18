


class BaseException {
    public message:string;
    public action:string;
    public consequence:string;
    public reason:string;
    public code:number;


    constructor() {
        this.message = '';
        this.action = '';
        this.consequence = '';
        this.reason = '';
        this.code = 500;
    }
}
