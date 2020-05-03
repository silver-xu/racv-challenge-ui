import React from "react";
import { useState } from "react";

import { ReactComponent as FavOn } from "../../svgs/fav-on.svg";
import { ReactComponent as FavOff } from "../../svgs/fav-off.svg";

import "./Fav.tsx.scss";

interface FavProps {
  onChange?: (checked: boolean) => void;
  checked: boolean;
}

export const Fav = (props: FavProps) => {
  const [checked, setChecked] = useState<Boolean>(props.checked);

  const handleClick = () => {
    const toggleChecked = !checked;

    setChecked(toggleChecked);
    if (props.onChange) {
      props.onChange(toggleChecked);
    }
  };

  return (
    <div onClick={handleClick} data-testid="fav">
      {checked ? <FavOn className="fav" /> : <FavOff className="fav" />}
    </div>
  );
};
