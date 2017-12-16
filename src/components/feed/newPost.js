import React from "react";

import UploadImage from "../common/uploadImage";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            type: "text",
            name: "textPostContent",
            title: "New Post",
            smallText: "Post Content",
            content: "",
            validationError: "",
            showImage: "hide",
            showTV: ""
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.newUploadedImage = this.newUploadedImage.bind(this);
        this.selectPostType = this.selectPostType.bind(this);
        this.sendPost = this.sendPost.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;

        this.setState({
            content: value,
            validationError: ""
        });
    }

    newUploadedImage(imageUrl) {
        this.props.uploadImage(imageUrl);
    }

    selectPostType(event) {
        event.preventDefault();

        const type = event.target.value;

        if (type === "text") {
            this.setState({
                type: "text",
                name: "textPostContent",
                title: "New Post",
                smallText: "Post Content",
                validationError: "",
                showImage: "hide",
                showTV: ""
            });
        } else if (type === "image") {
            this.setState({
                type: "image",
                showImage: "",
                showTV: "hide",
                validationError: ""
            });
        } else if (type === "video") {
            this.setState({
                type: "video",
                name: "videoPostContent",
                title: "New Video Post",
                smallText: "Youtube Video Link",
                validationError: "",
                showImage: "hide",
                showTV: ""
            });
        }
    }

    sendPost(event) {
        event.preventDefault();

        const { type, content } = this.state;;

        const isValid = this.validateInput();

        if (isValid) {
            let postData = "";

            if (type === "text") {
                postData = { text: content };
            } else if (type === "video") {
                const videoUrl = content.replace("watch?v=", "embed/");
                postData = { videoUrl: videoUrl };
            }

            this.props.sendPost(type, postData);
        }
    }

    validateInput() {
        const { type } = this.state;

        if (type === "text") {
            const text = this.state.content;

            if (!text) {
                this.setState({ validationError: "Please enter some text." });
                return false;
            } else {
                return true;
            }

        } else if (type === "image") {
            const imageUrl = this.state.content;

            if (!imageUrl) {
                this.setState({ validationError: "Please enter image URL." });
                return false;
            } else if (!imageUrl.includes("http://") && !imageUrl.includes("https://")) {
                this.setState({ validationError: "Image URL is invalid!" });
                return false;
            } else {
                return true;
            }

        } else if (type === "video") {
            const videoUrl = this.state.content;

            if (!videoUrl) {
                this.setState({ validationError: "Please enter video URL." });
                return false;
            } else if (!videoUrl.includes("http://www.youtube.com/") && !videoUrl.includes("https://www.youtube.com/")) {
                this.setState({ validationError: "Input must be YouTube video URL!" });
                return false;
            } else {
                return true;
            }
        }
    }

    render() {
        const { type, name, title, smallText, content, validationError, showImage, showTV } = this.state;
        const youtubePlaceholder = "../../assets/images/youtube.jpg";

        return (
            <div>
                <div className={showTV}>
                    <h2>{title}</h2>
                    <form>
                        {type === "text"
                            ? <div>
                                <label><small>{smallText}</small></label>
                                <textarea
                                    name={name}
                                    value={content}
                                    onChange={this.handleInputChange}
                                    className="d-block w-100 mt-2"
                                    rows="5"
                                ></textarea>
                            </div>

                            : <div>
                                <div className="mx-auto text-center mb-1 mt-3 w-100">
                                    <img
                                        src={youtubePlaceholder}
                                        style={{ maxWidth: 30 + "rem" }}
                                        className="w-100"
                                    />
                                </div>
                                <label className="mt-1"><small>{smallText}</small></label>
                                <input
                                    type="text"
                                    className="form-control modalInput"
                                    id="exampleInputText1"
                                    name={name}
                                    value={content}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        }
                    </form>

                    <div className="mt-3 float-right">
                        <button className="btn buttonLight my-2 my-sm-0 mr-2" onClick={this.sendPost}>
                            Post
                        </button>
                        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={this.props.toggleModal}>
                            Close
                        </button>
                    </div>

                    <div className="error" >
                        {validationError
                            ? <p>{validationError}</p>
                            : <p></p>
                        }
                    </div>
                </div>

                <div className={showImage}>
                    <div>
                        <h2>New Image Post</h2>
                        <UploadImage
                            uploadImage={this.newUploadedImage}
                            toggleModal={this.props.toggleModal}
                            showCloseButton={true}
                        />
                    </div>
                </div>

                <div className="text-center modalButtons">
                    <button
                        className="buttonLight round"
                        value="text"
                        onClick={this.selectPostType}
                    >T</button>
                    <p>Text</p>

                    <button
                        className="buttonLight round"
                        value="image"
                        onClick={this.selectPostType}
                    >I</button>
                    <p>Image</p>

                    <button
                        className="buttonLight round"
                        value="video"
                        onClick={this.selectPostType}
                    >V</button>
                    <p>Video</p>
                </div>
            </div>
        );
    }
}

export default NewPost;