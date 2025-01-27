import React from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../App";

export default function Card(props) {
  let navigate = useNavigate();
  let usertoken = window.localStorage.getItem("token");
  return (
    <div className="card">
      <img
        src={props.img}
        alt="movie poster"
        onClick={() => {
          navigate(`/movies/${props.id}`);
        }}
      />
      <span className="rating">{props.rating}⭐</span>
      <div className="card-body">
        <p>{props.movieName}</p>
      </div>
      <div className="card-footer d-flex justify-content-center">
        {props.watchlist === "true" ? (
          <button
            className="btn btn-wishlist"
            onClick={async function () {
              if (usertoken != null) {
                fetch(`${server}/watchlist/delete/${props.id}`, {
                  method: "DELETE",
                  crossDomain: true,
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "ok") {
                      alert("Movie Removed from Watchlist");
                      window.location.href = "/watchlist";
                    }
                  });
              } else {
                navigate(`/`);
              }
            }}
          >
            <i className="fa fa-bookmark"></i> Remove From Watchlist
          </button>
        ) : (
          <button
            className="btn btn-wishlist"
            onClick={async function () {
              if (usertoken != null) {
                await fetch(
                  `${server}/watchlist/${usertoken}/${props.id}/`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "error") {
                      fetch(`${server}/watchlist`, {
                        method: "POST",
                        crossDomain: true,
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                          userid: usertoken,
                          movieid: props.id,
                        }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.status === "ok") {
                            alert("Movie Added Successful");
                            navigate(`/`);
                          }
                        });
                    } else {
                      alert("Movie Already Exist in Watchlist");
                    }
                  });
              } else {
                navigate(`/login`);
              }
            }}
          >
            <i className="fa fa-bookmark"></i> Watchlist
          </button>
        )}
      </div>
    </div>
  );
}
