/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useContext, useEffect, FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import SearchHistory from '../map/searchHistory';
import { AuthProvider } from '../../utils/useContext';

// prop
interface Prop {
    setSearchKey: (value: string) => void,
    handleSearch: (searchKey: string, radius: number) => Promise<void>,
    handleLocation: (location: string) => Promise<void>,
}

// interface history {
//     userId: string;
//     searchString: string;
//     location: string;
// };

// interface historyData {
//     history: history[];
// }

// interface queryVariable {
//     userID: string | undefined ;
// }

const historyQuery = gql`
query ($userID: String) {
    result(userId: $userID) {
        userId
        searchString
        location
        radius
    }
}
`;

const QueryHistory: FC<Prop> = ({ setSearchKey, handleSearch, handleLocation }) => {
    const [searchHistory, setSearchHistory] = useState<any[]>([]);
    const { userId } = useContext(AuthProvider);

    const { loading, error, data } = useQuery(
        historyQuery,
        { variables: { userID: userId } }
    );

    useEffect(() => {
        if(error) {
            console.error(error);
        }
        if (data && data.result) {
            setSearchHistory(data.result)
        }
    }, [data, error])

    return (
        <>
            {
                loading ? (<p style={{ textAlign: "center" }}>loading</p>) : (
                    <SearchHistory searchHistory={searchHistory} setSearchKey={setSearchKey} handleSearch={handleSearch} handleLocation={handleLocation} />
                )
            }
        </>
    )
}

export default QueryHistory;