import React from "react";

import { Link } from "react-router-dom";
import moment from "moment";

import { BASEURL } from "../../constants";

export const UserDescription = (props) => {
    const { id, name, aboutShort, lastPostDate, avatarUrl } = props.userData;
    const lastPostTime = moment.utc(lastPostDate).fromNow();

    return (
        <Link to={`/people/${id}`}>
            <div className="card mb-4 w-100" style={{ height: 450 + "px" }} >
                <img
                    src={avatarUrl
                        ? avatarUrl
                        : "../../assets/images/batman.jpg"
                    }
                    className="mx-auto mt-3 rounded-circle card-img-top"
                    style={{ width: 250 + "px", height: 230 + "px" }} />
                <div className="card-body w-100 text-center position-relative">
                    <h3>{name}</h3>
                    <em>{aboutShort}</em>
                    <p className="mt-5">{lastPostTime}</p>
                </div>
            </div>
        </Link>
    );
};