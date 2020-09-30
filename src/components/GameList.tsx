import React from "react";
import { Link } from "react-router-dom";

const GameList = () => {
  const games = [
    {
      id: 1,
      name: "Reaction Time",
      description: "Test your reaction time",
      url: "/reaction-time",
    },
    {
      id: 2,
      name: "Aim Trainer",
      description: "Test your aim",
      url: "/aim-trainer",
    },
  ];
  return (
    <div className="row">
      {games.map((game) => (
        <div key={game.id} className="col-sm col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{game.name}</h5>
              <p className="card-text">{game.description}</p>
              <Link to={game.url} className="btn btn-primary">
                Play
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
