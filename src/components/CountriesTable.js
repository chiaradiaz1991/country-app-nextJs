import styles from "./CountryTable.module.css";
import React, { useState } from "react";
import Link from 'next/link'

const ORDER_BY = (countries, value, direction) => {
  if (direction === "asc") {
    //... create a new array of coutries
    return [...countries].sort((a, b) =>
      a[value] > b[value] ? 1 : -1
    );
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a[value] > b[value] ? -1 : 1
    );
  }
  return countries;
};

const SortButton = ({ direction }) => {
  if (!direction) return <></>;
  if (direction === "desc") {
    return <p>DESC</p>;
  } else {
    return <p>ASC</p>;
  }
};

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountry = ORDER_BY(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          <SortButton />
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          <SortButton direction={direction} />
        </button>
      </div>

      {orderedCountry.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}><a>
        <div className={styles.row} key={`country ${country.name}`}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.population}>{country.population}</div>
        </div>
        </a></Link>
      ))}
    </div>
  );
};

export default CountryTable;
