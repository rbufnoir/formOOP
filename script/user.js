export class User {
    constructor(username) {
        if (User.exist)
            return User.instance
        
        this.username = username;

        this.saveToLocalStorage()

        User.exist = true;
        User.instance = this;
        return this;
    }

    saveToLocalStorage() {
        localStorage.setItem('user', this.username);
    }

    get user() {
        const user_ = this.username || localStorage.getItem('user');

        if (user_) {
            const user = new User(user_);
        }
        else if (!user_)
            return null;

        return this.username;
    }

    set user(u) {
        return u;
    }

    delete() {
        localStorage.removeItem('user');
        User.exist = false;
        this.username = null;
        User.instance = null;
    }
}