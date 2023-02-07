import Wrapper from "../assets/wrappers/Tabela";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function GetPropertyValue(obj1, dataToRetrieve) {
  return dataToRetrieve.split(".").reduce(function (o, k) {
    return o && o[k]; // get inner property if `o` is defined else get `o` and return
  }, obj1); // set initial value as object
}

const Tabela2 = (props) => {
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
            <th key="veprimet">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          {props.data2.length > 0 ? (
            props.data2.map((data) => (
              <tr key={data._id} id={data._id}>
                {props.kol.map((data3) => (
                  <td id={data3.header} data-label={data3.header}>
                    <NavLink
                      to={props.url.replace("id", data._id)}
                      onClick={props.functioncall}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      end
                    >
                      {GetPropertyValue(data, data3.field)}
                    </NavLink>
                  </td>
                ))}

                {
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
                }
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
