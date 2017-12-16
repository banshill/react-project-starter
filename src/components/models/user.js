class User {
    constructor(id, name, aboutShort, lastPostDate, avatarUrl) {
        this._id = id;
        this._name = name;
        this._aboutShort = aboutShort;
        this._lastPostDate = lastPostDate;
        this._avatarUrl = avatarUrl;
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

    get aboutShort() {
        return this._aboutShort;
    }

    get lastPostDate() {
        return this._lastPostDate;
    }

    get avatarUrl() {
        return this._avatarUrl;
    }
}

export default User;