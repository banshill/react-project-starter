class CommentModel {
    constructor(id, dateCreated, body, postId, authorId, authorName, authorImage) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._body = body;
        this._postId = postId;
        this._authorId = authorId;
        this._authorName = authorName;
        this._authorImage = authorImage;
    }

    get id() {
        return this._id;
    }
    
    get dateCreated() {
        return this._dateCreated;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get postId() {
        return this._postId;
    }

    get authorId() {
        return this._authorId;
    }

    get authorName() {
        return this._authorName;
    }

    get authorImage() {
        return this._authorImage;
    }
}

export default CommentModel;