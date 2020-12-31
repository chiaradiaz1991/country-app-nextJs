import Layout from "../../components/Layout";
import styles from "./country.module.css";
import React, {useEffect, useState} from 'react'

const getCountry = async (id) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${id}`
  );
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [border, setBorder] = useState([]);

  const getBorders = async() => {
    const borders = await Promise.all(country.borders.map(border=> getCountry(border)))
    setBorder(borders)
  }

  useEffect(()=> {
    getBorders();
  },[])
  

  
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name}></img>
          <h1>{country.name}</h1>
          <div>{country.region}</div>
          <div>
            <div className={styles.overview_population}>
              <div className={styles.overview_label}>Population</div>
              <div className={styles.overview_value}>{country.population}</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_label}>Area</div>
              <div className={styles.overview_value}>{country.area}</div>
            </div>
          </div>
        </div>
        <div>
          <h4>Details</h4>
          <div>Capital</div>
          <div>{country.capital}</div>
          <div>Subregion</div>
          <div>{country.subregion}</div>
        </div>
        <div>
          {border.map(({flag, name})=> <div>
            <img src={flag} />
            <p>{name}</p>
          </div>)}
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async ()=> {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  const paths= countries.map(country => ({
    params: {id: country.alpha3Code},
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
