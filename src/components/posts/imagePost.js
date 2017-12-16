import React from "react";

import moment from "moment";
import { Link } from "react-router-dom";

import DeletePost from "../posts/deletePost";

export const ImagePost = props => {
    const { id, imageUrl, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const { error } = props.error;
    const postDate = moment.utc(dateCreated).fromNow();

    if (error) {
        return (
            <div className={props.show}>
                <div className="card w-100">
                    <div className="card-body">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={props.show}>
            <div className="card mb-4 w-100">
                <img
                    src={imageUrl}
                    className="card-img-top w-100"
                    style={props.style}
                />

                <div className="card-body pt-3">
                    <div className={props.usersPost.toString()}>
                        <DeletePost id={id} deletePost={props.deletePost} />
                    </div>
                    <Link to={`/people/${userId}`}>
                        <h5>{userDisplayName}</h5>
                    </Link>
                    <small>{postDate}</small>
                    <Link to={`/posts/image/${id}`}>
                        <h6 className="float-right">{commentsNum} Comments</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
};







