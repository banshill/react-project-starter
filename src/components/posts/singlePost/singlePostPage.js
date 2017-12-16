import React from "react";

import { Link } from "react-router-dom";
import moment from "moment";

import { USER_ID } from "../../../constants";
import { dataService } from "../../services/serviceData";
import { storageService } from "../../services/serviceStorage";
import { redirect } from "../../services/serviceRedirect";

import { TextPost } from "../textPost";
import { ImagePost } from "../imagePost";
import { VideoPost } from "../videoPost";
import Comment from "../singlePost/comment";
import AddComment from "../singlePost/addComment";

class SinglePostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            post: "",
            comments: [],
            commentsError: "",
            userImages: [],
            userImageCounter: 0
        };
    }

    bindEventHandlers() {
        this.deletePost = this.deletePost.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        const type = this.props.match.params.type;
        this.getPost(type, id);
    }

    cannotDeletePost(error) {
        if (error.request) {
            this.setState({ commentsError: "Unable to delete post." });
        }
    }

    cannotLoadComments(error) {
        if (error.request) {
            this.setState({ commentsError: "Cannot load comments." });
        }
    }

    deletePost(id) {
        dataService.deletePost(id, response => redirect("/"), error => this.cannotDeletePost(error));
    }

    getComments(id) {
        dataService.getComments(id, comments => {
            this.setState({ comments: comments });
        }, error => this.cannotLoadComments(error));
    }

    getPost(type, id, callback) {
        if (type === "text") {
            dataService.getTextPost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        } else if (type === "image") {
            dataService.getImagePost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        } else if (type === "video") {
            dataService.getVideoPost(parseInt(id), post => this.loadPost(post), error => this.handleNetworkRequestError(error));
        }
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadPost(post) {
        this.setState({ post: post });
        this.getComments(post.id);
    }

    postComment(commentData) {
        dataService.postComment(commentData, comments => {
            this.setState({ comments: comments }), error => this.handleCommentsNetworkRequestError(error);
            scrollTo(0, document.body.scrollHeight);
        });
    }

    renderPost(post) {
        const userId = parseInt(storageService.getStorageItem(USER_ID));
        let usersPost = "";

        if (userId === post.userId) {
            usersPost = true;
        } else {
            usersPost = false;
        }

        if (post.type === "text") {
            return <TextPost post={post} key={post.id} error={this.state.commentsError} usersPost={usersPost} deletePost={this.deletePost} />;
        } else if (post.type === "image") {
            return <ImagePost post={post} key={post.id} error={this.state.commentsError} usersPost={usersPost} deletePost={this.deletePost} />;
        } else if (post.type === "video") {
            return <VideoPost post={post} key={post.id} error={this.state.commentsError} usersPost={usersPost} deletePost={this.deletePost} />;
        }
    }

    render() {
        const { validationError, commentsError, userImages } = this.state;
        const { text, id, userDisplayName, userId, commentsNum, dateCreated } = this.state.post;
        const postDate = moment(dateCreated).fromNow();

        return (
            <main className="container">
                <div className="row w-100 mx-auto mb-4 mt-4">
                    <div className="w-100 col-sm-12 col-md-8 offset-md-2">

                        {this.renderPost(this.state.post)}

                        <AddComment onPostComment={this.postComment} id={id} />

                        {this.state.comments.map(comment => <Comment key={comment.id} comment={comment} />)}

                    </div>
                </div>
            </main>
        );
    }
}

export default SinglePostPage;