import React, { useState, useEffect, FC, useContext } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { firestore } from '../../auth/firebase.config';
import SearchHistory from '../searchHistory';
import { AuthProvider } from '../../utils/useContext';
import useStyles from '../../styles/mapStyle';
import SearchInput from '../searchInput';

const icon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
    iconSize: [30, 25],
    iconAnchor: [24, 14],

})

const AutorizedMap: FC = () => {
    const classes = useStyles();
    const [location, setLocation] = useState<string>('');
    const [lat, setLat] = useState<number>(6.5243793);
    const [lng, setLng] = useState<number>(3.3792057);
    const [searchKey, setSearchKey] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [searchKeyresults, setSearchKeyResults] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const { userId } = useContext(AuthProvider);

    useEffect(() => {
        // the search key eg hospital
        handlePlace();
        HandleGetSearchHistory();
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const db = firestore;
        db.collection('searchHistory').add({
            searchString: searchKey,
            userId: userId,
            location: location 
        });
    }

    const HandleGetSearchHistory = async () => {
        const db = firestore;
         await db.collection('searchHistory').get().then(snapshot => {
            const strings: any = [];
            snapshot.docs.map(data => {
                if(data.data().userId === userId) {
                    const values: any = data.data()
                    strings.push({
                        searchString: values.searchString,
                        location: values.location
                    })
                }
            })
            setSearchHistory(strings)
        })
        .catch(e => console.error(e))
        
    }

    const handlePlace = async () => {
        const response = await fetch(`https://api.tomtom.com/search/2/poiCategories.json?key=ciIsGdG3irXcWG9ukyhZfMvZ0aZUbnkU`, {
            method: 'GET'
        });

        const data = await response.json()
        if (data.length < 1) {
            return console.log('not found')
        }
        const keys: any[] = [];
        data.poiCategories.map((category :any) => {
            if(category.name === 'Hospital' && category.id === 7321) {
                keys.push({
                    id: category.id,
                    name: category.name
                })
            }

            if(category.name === 'Pharmacy' && category.id === 7326) {
                keys.push({
                    id: category.id,
                    name: category.name
                })
            }
        })

        setSearchKeyResults(keys)

        console.log('place', keys)

        // setLocation(data.name)
    }

    const handleLocation = async () => {
        const response = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&address=${location}`, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "2b140728d4msh9fed995ffd67651p16455cjsnd6c6d9e20a66"
            }
        });

        const data = await response.json()
        if (data.length < 1) {
            return console.log('not found')
        }
        setLat(data.results[0].geometry.location.lat);
        setLng(data.results[0].geometry.location.lng);
    }

    const handleSearch = async () => {
        try {
            // capitalize first string
            const searchKeyCap = searchKey.charAt(0).toUpperCase() + searchKey.slice(1);

            // string code. api search by string code eg pharmacy = 7326
            let code: number = 0
            searchKeyresults.map((key: any) => {
                if(key.name === searchKeyCap) {
                    code = key.id
                    console.log(key.name)
                }
                // else if (searchKeyCap === 'Clinic' || searchKeyCap === 'Medical office') {
                //     code = key.id
                //     // console.log(key[0].id)
                // }
                // console.log(key.name)
            })
            const response = await fetch(`https://api.tomtom.com/search/2/poiSearch/${searchKeyCap}.json?lat=${lat}&lon=${lng}&extendedPostalCodesFor=PAD&categorySet=${code}&key=ciIsGdG3irXcWG9ukyhZfMvZ0aZUbnkU`, {
                method: 'GET',
            })
            const data = await response.json();
            console.log('results', data)
            if (!data.results) {
                return console.log('not found')
            }

            // for (let i = 0; i < data.features.length; i++) {
            //     console.log(data.features[i].geometry.coordinates)
            // }
            const pos: any = []
            data.results.map((latlng: any) => {
                pos.push(latlng.position)
            })
            setResults(pos)

            console.log('poss', pos)
        }
        catch (e) {
            console.error(e)
        }

    }

    // search input prop object
    const searchInputPropObject = {
        setSearchKey,
        searchKey,
        handleSubmit,
        handleLocation,
        handleSearch,
        setLocation
    }
   
    return (
        <div className={classes.container}>
            <div className={classes.right}>
                    <SearchInput propObject={searchInputPropObject} />
                <SearchHistory searchHistory={searchHistory} setSearchKey={setSearchKey} handleSearch={handleSearch}/>
            </div>
            <div >
                <Map  center={[lat, lng]} className={classes.mapLayout} zoom={13}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {results.map((data: any, index) => (
                        <Marker key={index} marker_index={index} position={[data.lat, data.lon]} icon={icon} />
                    )
                    )}
                </Map>
            </div>
        </div>
    );
}

export default AutorizedMap;