import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cards from "../components/card";
import { addtocart } from "../redux/actions/cartAction";
const Home = () => {
  const dispatch = useDispatch();
  const { products, alert } = useSelector((state) => state);
  const handleIncrement = (item) => {
    dispatch(addtocart(item));
  };
  return (
    <>
      <section className="iteam_section mt-4 container">
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {products.products.map((element, index) => (
            <Cards data={element} handleIncrement={handleIncrement} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
