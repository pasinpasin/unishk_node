import Wrapper from "../assets/wrappers/Tabela";
import React from "react";
import { NavLink } from "react-router-dom";

const Tabela2 = (props) => {
  // console.log(props.data);
  let i = 0;
  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            {props.kol.length > 0 ? (
              props.kol.map((column) => (
                <th key={column.field}> {column.header}</th>
              ))
            ) : (
              <th colSpan={3}>Nuk ka te dhena per kolonat</th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.data2.length > 0 ? (
            props.data2.map((data) => (
              <tr key={data._id}>
                <td data-label={props.kol[0].header}>
                  <NavLink
                    to={props.url.replace("id", data._id)}
                    onClick={props.functioncall}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    end
                  >
                    {data.emertimi}
                  </NavLink>
                </td>

                <td data-label="Veprimet">
                  <button
                    className="btn  "
                    onClick={() => props.modifiko(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn "
                    onClick={() => props.fshij(data._id)}
                  >
                    Delete
                  </button>
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
    </Wrapper>
  );
};

export default Tabela2;
