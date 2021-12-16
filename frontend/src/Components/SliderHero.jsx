import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSlideHeros } from "../redux/actions/slideHeroAction";
import { slideHerosState$ } from "../redux/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SliderHero = ({ autoPlay, speed }) => {
  const dispatch = useDispatch();
  const data = useSelector(slideHerosState$);

  useEffect(() => {
    dispatch(getSlideHeros.getSlideHerosReq());
  }, [dispatch]);

  const speedAf = speed ? speed : 3000;
  const [active, setActive] = useState(0);

  const onNext = useCallback(() => {
    if (data) {
      const iEnd = data.length - 1;
      setActive(active === iEnd ? 0 : active + 1);
    }
  }, [active, data]);

  const onPrev = () => {
    if (data) {
      const iEnd = data.length - 1;
      setActive(active === 0 ? iEnd : active - 1);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      const autoSlider = setInterval(() => {
        onNext();
      }, speedAf);
      return () => {
        clearInterval(autoSlider);
      };
    }
  }, [active, onNext, speedAf, autoPlay]);

  return (
    <div className="c-slider01">
      {data &&
        data.map((item, index) => (
          <SlideHeroItem key={index} data={item} active={index === active} />
        ))}
      {data && data.length !== 1 ? (
        <ul className="c-slider01__control">
          <li onClick={onPrev} className="prev">
            <FontAwesomeIcon icon={faAngleLeft} />
          </li>
          <li>
            {active + 1}/{data.length}
          </li>
          <li onClick={onNext} className="next">
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

const SlideHeroItem = (props) => {
  const divStyle = {
    color: {
      color: props.data.color,
    },
    bg: {
      background: props.data.color,
    },
  };

  return (
    <div className={`c-slider01__item ${props.active ? "active" : ""}`}>
      <div className="c-slider01__info">
        <div className={`c-ttl01 ani`}>
          <span style={divStyle.color}>{props.data.name}</span>
        </div>
        <div className={`description`}>
          <span>{props.data.description}</span>
        </div>
        <div style={divStyle.bg} className="c-btn01">
          <Link to={props.data.path}>
            Xem Chi Tiết <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </div>
      </div>
      <div className="c-slider01__img">
        <img src={props.data.image} alt={props.data.name} />
        <div style={divStyle.bg} className="shape"></div>
      </div>
    </div>
  );
};

export default SliderHero;
