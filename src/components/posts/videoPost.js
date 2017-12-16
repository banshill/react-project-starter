import React from "react";

import moment from "moment";
import { Link } from "react-router-dom";

import DeletePost from "../posts/deletePost";

export const VideoPost = props => {
    const { id, videoUrl, dateCreated, userId, userDisplayName, type, commentsNum } = props.post;
    const { error } = props.error;
    const postDate = moment.utc(dateCreated).fromNow();

    if (error) {
        return (
            <div className={props.show}>
                <div className="card w-100" >
                    <div className="card-body">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={props.show}>
            <div className="card mb-4">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        src={videoUrl}
                        frameBorder="0"
                        allowFullScreen
                        className="card-img-top embed-responsive-item w-100">
                    </iframe>
                </div>

                <div className="card-body pt-3">
                    <div className={props.usersPost.toString()}>
                        <DeletePost id={id} deletePost={props.deletePost} />
                    </div>

                    <Link to={`/people/${userId}`}>
                        <h5>{userDisplayName}</h5>
                    </Link>
                    <small>{postDate}</small>
                    <Link to={`/posts/video/${id}`}>
                        <h6 className="float-right">{commentsNum} Comments</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
};