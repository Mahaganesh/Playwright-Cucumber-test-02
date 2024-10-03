import { makeAutoObservable } from 'mobx';

class SetmoreLoginStore {
    email: string = '';
    password: string = '';
    isLoggedIn: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setLoginStatus(status: boolean) {
        this.isLoggedIn = status;
    }

    get getEmail() {
        return this.email;
    }

    get getPassword() {
        return this.password;
    }

    get getLoginStatus() {
        return this.isLoggedIn;
    }
}

const setmoreLoginStore = new SetmoreLoginStore();
export default setmoreLoginStore;
