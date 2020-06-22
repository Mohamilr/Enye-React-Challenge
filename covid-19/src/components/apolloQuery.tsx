/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import { Query } from "react-apollo";
import { useQuery } from  '@apollo/react-hooks';
import gql from "graphql-tag";

import { AuthProvider } from '../utils/useContext';


interface history {
    userId: string;
    searchString: string;
    location: string;
};

interface historyData {
    history: history[];
}

interface queryVariable {
    userId: string ;
}

const historyQuery = gql`
      query Query ($userID: String) {
        result(userId: $userID) {
            userId
            searchString
            location
        }
    }
`;

const QueryHistory = () => {
    const { userId } = useContext(AuthProvider);

    const { loading, data } = useQuery(
        historyQuery,
        { variables: {userId: '8XKAcnjSOjfZe6VkCNdxE4BFBay1' } }
      );

    //   useQuery(GET_USER_HISTORY, {
    //     pollInterval: 500
    //   });

      useEffect(() => {
          
       console.log(data)
      }, [data])

      return (
          <>
          {
          loading ? (<p>loading</p>) : (<div>data</div>)
        // // :
        // // {
        //     console.log(data)
        //     // return (
        //     // )
        }
    
    
        </>
      )
//         <Query
//     query={gql`
//       query ($userID: String) {
//         result(userId: $userID) {
//            searchString
//             location
//             userId
//         }
//     }
//     `}
//     variables={{userId}}
//   >
//         {({ loading, error, data }) => {
//       if (loading) return null;
//       if (error) return `Error! ${error}`;

//       return (
//         <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
//       );
//     }}
 
//   </Query>
    // )
}

export default QueryHistory;