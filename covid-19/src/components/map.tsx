import React, { useState, useEffect } from 'react';
import { InputNumber, Col, Descriptions } from 'antd';
import 'antd/dist/antd.css';

type CustomValue = any;
export interface Result {
    address: string,
    distance: number,
    id: string,
    name: string,
    phone_number: string,
}

export interface Array {

}

const Map = () => {
    // const [location, setLocation] = useState<CustomValue>([]);
    // const [searchKey, setSearchKey] = useState<string>('');
    const [radius, setRadius] = useState<string>('24');
    const [result, setResult] = useState<Result[]>([]);

    useEffect(() => {
        handleSearch()
        // handleLocation();
    }, [radius]);

    //     const handleLocation = async () => {
    //         const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/lagos.json?access_token=pk.eyJ1IjoibW9oYW1pbHIiLCJhIjoiY2tiMm42eW81MDBvNDJ4anp2YW5xY3RkeiJ9.K5J-TRV3i3LRkK-RwWEqKw`, {
    //             method: 'GET'
    //         });

    //         const data = await response.json()
    //         console.log('place', data)
    //         for (let i=0; i < data.features.length; i++ ) {
    //             if (i === 0) {
    //                 setLocation(data.features[i].bbox)
    //             }
    //         }


    //     }
    // console.log('filter', location[0])

    // console.log('filter', location[1])

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://trueway-places.p.rapidapi.com/FindPlacesNearby?type=hospital&radius=${radius}&language=en&location=6.5244,3.3792`, {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "2b140728d4msh9fed995ffd67651p16455cjsnd6c6d9e20a66",
                }
            })
            const data = await response.json();
            console.log(data)
            setResult(data.results)
            return data;
        }
        catch (e) {
            console.error(e)
        }

    }

    console.log('result', result)
    return (
        <div style={{marginTop: '3em'}}>
            <div>
                <Col span={12}>
                    {/* <Input placeholder="search by location" allowClear onChange={e => setSearchKey(e.target.value)} /> */}
                    <InputNumber min={1} max={100} defaultValue={12} onChange={(e: any) => setRadius(e)} />,
                </Col>
            </div>
            <div>
                <h1>Search Result</h1>
                {result.length < 1 ? 
                <div>Loading ...</div> : 
                result.map(data => (
                    <div key={data.id}>
                        <Descriptions  layout="vertical" bordered>
                            <Descriptions.Item label="Address">{data.address}</Descriptions.Item>
                            <Descriptions.Item label="Hospital Name">{data.name}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{data.phone_number}</Descriptions.Item>
                        </Descriptions>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Map;