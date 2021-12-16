import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainvisual } from "../redux/actions/mainvisualAction";
import { mainvisualState$ } from "../redux/selectors";

const MainVisual = () => {
  const dispatch = useDispatch();
  const data = useSelector(mainvisualState$);
  useEffect(() => {
    dispatch(getMainvisual.getMainvisualReq());
  }, [dispatch]);

  return (
    <div className="c-mainvisual">
      <div className="l-container c-mainvisual__inner">
        <h2 className="c-ttl">{data && data[0].name}</h2>
        <p>{data && data[0].decription}</p>
      </div>
      <div className="c-videomv">
        <video
          src={data && data[0].video}
          controls={true}
          type="video/mp4"
          loop
          muted
          autoPlay
        ></video>
      </div>
    </div>
  );
};

export default MainVisual;
