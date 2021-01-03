import React from "react";
//import { useQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GRAPHQL_QUERY = gql`
  {
    domains(first: 5) {
      id
      name
      labelName
      labelhash
    }
  }
`;

export function TestQuery() {
  const { loading, error, data } = useQuery(GRAPHQL_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div>
      {data && data.domains && (
        <div>
          <div>
            <h3>{data.domains[2].name}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
