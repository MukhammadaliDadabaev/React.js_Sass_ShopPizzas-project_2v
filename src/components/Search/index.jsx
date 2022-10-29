import React, { useCallback, useRef, useState } from "react";
// LODASH.DBOUNCE
import debounce from "lodash.debounce";
// react-icons
import { GrSearch, GrFormClose } from "react-icons/gr";
import styles from "./Search.module.scss";

import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  //-------> STATE
  const [value, setValue] = useState("");

  const inputRef = useRef();

  //------> Hendler func
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };
  //------> Lodash-input useCallback
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <GrSearch className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <GrFormClose onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  );
};

export default Search;
