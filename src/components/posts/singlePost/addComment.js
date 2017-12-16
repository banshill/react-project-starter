import React from "react";

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            newComment: ""
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();

        const value = event.target.value;

        this.setState({ newComment: value });
    }

    postComment(event) {
        event.preventDefault();

        const isValid = this.validateInput();

        if (isValid) {
            const postId = this.props.id;

            const commentData = { postId: postId, body: this.state.newComment };

            this.props.onPostComment(commentData);

            this.setState({ newComment: "" });
        }
    }

    validateInput() {
        if (!this.state.newComment) {
            this.setState({ commentsError: "Please enter some text." });
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <form className="w-100">
                <div className="w-100">
                    <textarea
                        placeholder="Add your comment..."
                        value={this.state.newComment}
                        onChange={this.handleInputChange}
                        className="w-100"
                        rows="4">
                    </textarea>

                    <button onClick={this.postComment} className="btn buttonDark float-right mb-4">Post</button>
                </div>
            </form>
        );
    }
}

export default AddComment;