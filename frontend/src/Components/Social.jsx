import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSocials } from "../redux/actions/socialAction";
import { socialsState$ } from "../redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const Social = () => {
  const dispatch = useDispatch();

  const data = useSelector(socialsState$);
  useEffect(() => {
    dispatch(getSocials.getSocialsReq());
  }, [dispatch]);
  return (
    <ul className="c-social">
      {data &&
        data.map((item, index) => (
          <li key={index}>
            <a href={item.path} className={item.name.toLowerCase()}>
              <FontAwesomeIcon icon={["fab", item.name.toLowerCase()]} />
            </a>
          </li>
        ))}
    </ul>
  );
};

export default Social;
