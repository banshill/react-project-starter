import React from "react";

import moment from "moment";

import { dataService } from "../../services/serviceData";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return {
            userImage: "../../../assets/images/batman.jpg"
        };
    }

    componentDidMount() {
        const id = this.props.comment.authorId;
        this.getUserImage(id);
    }

    getUserImage(id) {
        dataService.getUserProfile(id, profile => this.setState({ userImage: profile.avatarUrl }));
    }

    render() {
        const { body, dateCreated, authorName } = this.props.comment;
        const postDate = moment(dateCreated).fromNow();

        return (
            <div className="card mt-4 w-100">
                <div className="card-body row pt-2 pb-2">
                    <div className="h-100 mt-2 text-center col-md-3 textMobile">
                        <img
                            src={this.state.userImage}
                            className="rounded-circle imageMobile"
                            style={{ width: 5 + "rem", height: 5 + "rem" }}
                        />
                        <p className="pt-2 nameMobile">{authorName}</p>
                    </div>
                    <div className="h-100 my-auto pb-4 pt-2 pl-3 col-md-9 position-relative">
                        <p className="text-justify">{body}</p>
                    </div>
                    <small className="float-right postTime">{postDate}</small>
                </div>
            </div>
        );
    }
}

export default Comment;