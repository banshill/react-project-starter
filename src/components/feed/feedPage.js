import React from "react";

import { dataService } from "../services/serviceData";
import { storageService } from "../services/serviceStorage";

import { USER_ID } from "../../constants";
import { Link } from "react-router-dom";

import { TextPost } from "../posts/textPost";
import ImagePost from "../posts/imagePost";
import VideoPost from "../posts/videoPost";

import Modal from "react-modal";

class FeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            posts: [],
            textPost: "",
            imagePost: "",
            videoPost: "",
            networkError: "",
            error: "",
            modal: false,
            show: "text",
            new: {
                textPostContent: "",
                imagePostContent: "",
                videoPostContent: ""
            },
            filterTitle: "All Posts",
            filter: {
                text: "",
                image: "",
                video: ""
            }
        };
    }

    bindEventHandlers() {
        this.toggleModalShow = this.toggleModalShow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.selectPostType = this.selectPostType.bind(this);
        this.sendTextPost = this.sendTextPost.bind(this);
        this.sendImagePost = this.sendImagePost.bind(this);
        this.sendVideoPost = this.sendVideoPost.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
    }

    componentDidMount() {
        this.getUserId();
        this.getPosts();
    }

    getPosts() {
        dataService.getPosts(posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));
    }

    getUserId() {
        dataService.getProfile(profile => storageService.setStorageItem(USER_ID, profile.userId),
            error => this.handleNetworkRequestError(error));
    }

    filterPosts(event) {
        event.preventDefault();
        const type = event.target.value;

        const showTextPosts = type === "Text" || type === "All Posts" ? "" : "hide";
        const showImagePosts = type === "Images" || type === "All Posts" ? "" : "hide";
        const showVideoPosts = type === "Videos" || type === "All Posts" ? "" : "hide";

        this.setState({
            filterTitle: type,
            filter: {
                text: showTextPosts,
                image: showImagePosts,
                video: showVideoPosts
            }
        });
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            prevState.new[name] = value;
            prevState.error = "";
            return prevState;
        });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ networkError: "There is no response from server." });
        }
    }

    jumpToTop() {
        this.setState({ error: "" });
        this.toggleModalShow();
        scrollTo(0, 0);
    }

    getTextPost(id) {
        dataService.getTextPost(id, textPost => this.setState({ textPost: textPost }), error => this.handleNetworkRequestError(error));
    }


    renderPosts(post) {
        const { text, image, video } = this.state.filter;

        if (post._type === "text") {
            this.getTextPost(post._id);
            return <TextPost key={post._id} show={text} post={this.state.textPost} error={this.state.networkError} />;
        } else if (post._type === "image") {
            return <ImagePost post={post} key={post._id} show={image} />;
        } else if (post._type === "video") {
            return <VideoPost post={post} key={post._id} show={video} />;
        }
    }

    selectPostType(event) {
        event.preventDefault();

        const type = event.target.value;

        this.setState({ show: type });
    }

    sendTextPost(event) {
        event.preventDefault();

        const isValid = this.validateTextInput();

        if (isValid) {
            const postData = { text: this.state.new.textPostContent };

            dataService.postTextPost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    sendImagePost(event) {
        event.preventDefault();

        const isValid = this.validateImageInput();

        if (isValid) {
            const postData = { imageUrl: this.state.new.imagePostContent };

            dataService.postImagePost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    sendVideoPost(event) {
        event.preventDefault();

        const isValid = this.validateVideoInput();

        if (isValid) {
            const videoUrl = this.state.new.videoPostContent.replace("watch?v=", "embed/");

            const postData = { videoUrl: videoUrl };

            dataService.postVideoPost(postData, posts => this.setState({ posts: posts }), error => this.handleNetworkRequestError(error));

            this.jumpToTop();
        }
    }

    toggleModalShow() {
        event.preventDefault();

        if (this.state.modal === false) {
            this.setState({
                modal: true,
                new: {
                    textPostContent: "",
                    imagePostContent: "",
                    videoPostContent: ""
                }
            });
        } else {
            this.setState({
                modal: false,
            });
        }
    }

    togglePostType(type) {
        const { show, error, modal, filterTitle } = this.state;
        const { textPostContent, imagePostContent, videoPostContent } = this.state.new;

        if (type === "text") {
            return (
                <div>
                    <h2>New Post</h2>
                    <form>
                        <label htmlFor="exampleInputText1"><small>Post content</small></label>
                        <input
                            type="text"
                            className="form-control modalInput"
                            id="exampleInputText1"
                            name="textPostContent"
                            value={textPostContent}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <div>
                        <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendTextPost}>
                            Post
                        </button>
                        <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                            Close
                        </button>
                    </div>
                </div>
            );
        } else if (type === "image") {
            return (
                <div>
                    <h2>New Image Post</h2>
                    <form>
                        <label htmlFor="exampleInputText1"><small>Image Link</small></label>
                        <input
                            type="text"
                            className="form-control modalInput"
                            id="exampleInputText1"
                            name="imagePostContent"
                            value={imagePostContent}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <div>
                        <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendImagePost}>
                            Post
                        </button>
                        <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                            Close
                        </button>
                    </div>
                </div>
            );
        } else if (type === "video") {
            return (
                <div>
                    <h2>New Video Post</h2>
                    <form>
                        <label htmlFor="exampleInputText1"><small>YouTube Video Link</small></label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            id="exampleInputText1"
                            name="videoPostContent"
                            value={videoPostContent}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <div>
                        <button className="btn buttonLight my-2 my-sm-0 saveButtonStyle" onClick={this.sendVideoPost}>
                            Post
                        </button>
                        <button className="btn btn-outline-danger my-2 my-sm-0 closeButtonStyle" onClick={this.toggleModalShow}>
                            Close
                        </button>
                    </div>
                </div>
            );
        }
    }

    validateTextInput() {
        const text = this.state.new.textPostContent;

        if (!text) {
            this.setState({ error: "Please enter some text." });
            return false;
        } else {
            return true;
        }
    }

    validateImageInput() {
        const imageUrl = this.state.new.imagePostContent;

        if (!imageUrl) {
            this.setState({ error: "Please enter image URL." });
            return false;
        } else if (!imageUrl.includes("http://") && !imageUrl.includes("https://")) {
            this.setState({ error: "Image URL is invalid!" });
            return false;
        } else {
            return true;
        }
    }

    validateVideoInput() {
        const videoUrl = this.state.new.videoPostContent;

        if (!videoUrl) {
            this.setState({ error: "Please enter video URL." });
            return false;
        } else if (!videoUrl.includes("http://www.youtube.com/") && !videoUrl.includes("https://www.youtube.com/")) {
            this.setState({ error: "Input must be YouTube video URL!" });
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { show, error, modal, filterTitle } = this.state;
        const { textPostContent, imagePostContent, videoPostContent } = this.state.new;

        const modalStyle = {
            overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.75)"
            },
            content: {
                position: "absolute",
                top: "25%",
                left: "30%",
                right: "30%",
                bottom: "50%",
                border: "0.5px solid rgba(43, 122, 120, 0.5)",
                background: "#feffff",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "20px"
            }
        };

        if (this.state.posts.length < 1) {
            return (
                <main className="row">
                    <h1 className="text-center">Loading posts...</h1>
                </main>
            );
        }

        return (
            <main className="row mt-2">
                <div className="col-12 col-lg-9 offset-lg-1">

                    <div className="btn-group mt-3">

                        <button type="button" className="btn buttonDark">{filterTitle}</button>
                        <button type="button" className="btn buttonDark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" value="All Posts" onClick={this.filterPosts}>All Posts</button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" value="Videos" onClick={this.filterPosts}>Videos</button>
                            <button className="dropdown-item" value="Images" onClick={this.filterPosts}>Images</button>
                            <button className="dropdown-item" value="Text" onClick={this.filterPosts}>Text</button>
                        </div>
                    </div>



                    <p className="error">{this.state.networkError}</p>

                    {this.state.posts.map(post => this.renderPosts(post))}

                    <Modal isOpen={modal} style={modalStyle} >

                        {this.togglePostType(show)}

                        <div className="error">
                            {error
                                ? <p>{error}</p>
                                : <p></p>
                            }
                        </div>

                        <div className="text-center">
                            <button className="buttonLight round" value="text" onClick={this.selectPostType}>T</button><p>Text</p>
                            <button className="buttonLight round" value="image" onClick={this.selectPostType}>I</button><p>Image</p>
                            <button className="buttonLight round" value="video" onClick={this.selectPostType}>V</button><p>Video</p>
                        </div>
                    </Modal >
                </div>

                <div className="col-lg-2"></div>



                <button className="btn-block buttonDark round postButton" onClick={this.toggleModalShow}><p>+</p></button>


            </main>
        );
    }
}

export default FeedPage;
