import Wrapper from "../assets/wrappers/Tabela";
import React from "react";

const Tabela = (props) => {
  console.log(props.data);
  return (
    <table>
      <thead>
        <tr>
          {props.kol.length > 0 ? (
            props.kol.map((column) => <th> {column.header}</th>)
          ) : (
            <th colSpan={3}>Nuk ka te dhena per kolonat</th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.data.length > 0 ? (
          props.data.map((data) => (
            <tr key={data._id}>
              <td>{data.emertimi}</td>

              <td>
                <button className="button muted-button">Edit</button>
                <button className="button muted-button">Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>Nuk ka te dhena</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Tabela;
