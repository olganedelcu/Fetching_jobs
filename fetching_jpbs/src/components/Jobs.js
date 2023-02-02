import React from "react";
import { gql, useQuery } from "@apollo/client";
import ApolloClient from "apollo-client";

const client = new ApolloClient({
  uri: "https://graphql.jobs/docs/api/"
});

const JOBS_QUERY = gql`
  query JobsQuery {
    jobs {
      id
      title
      company {
        name
      }
      location {
        city
        country
      }
      remote
    }
  }
`;

const Jobs = () => {
  const { loading, error, data } = useQuery(JOBS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error </p>;

  return (
    <ApolloProvider client={client}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Remote</th>
          </tr>
        </thead>
        <tbody>
          {data.jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company.name}</td>
              <td>{job.location.city}</td>
              <td>{job.location.country}</td>
              <td>{job.remote ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ApolloProvider>
  );
};

export default Jobs;
