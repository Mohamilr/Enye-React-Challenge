import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Map, TileLayer } from 'react-leaflet';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '2em'
        },
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

const Maps = () => {
    const classes = useStyles();
    const [location, setLocation] = useState<string>('');
    const [lat, setLat] = useState<number>(6.5243793);
    const [lng, setLng] = useState<number>(3.3792057);
    const [searchKey, setSearchKey] = useState<string>('');
    const [radius, setRadius] = useState<string>('12');
    // const [positionA, setPositionA] = useState([]);
    // const [positionB, setPositionB] = useState([]);


    const handlePlace = async () => {
        const response = await fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${searchKey}&limit=1&skip=0&language=en&country=AF,
        AX,
        AL,
        DZ,
        AS,
        AD,
        AO,
        AI,
        AQ,
        AG,
        AR,
        AM,
        AW,
        AU,
        AT,
        AZ,
        BH,
        BS,
        BD,
        BB,
        BY,
        BE,
        BZ,
        BJ,
        BM,
        BT,
        BO,
        BQ,
        BA,
        BW,
        BV,
        BR,
        IO,
        BN,
        BG,
        BF,
        BI,
        KH,
        CM,
        CA,
        CV,
        KY,
        CF,
        TD,
        CL,
        CN,
        CX,
        CC,
        CO,
        KM,
        CG,
        CD,
        CK,
        CR,
        CI,
        HR,
        CU,
        CW,
        CY,
        CZ,
        DK,
        DJ,
        DM,
        DO,
        EC,
        EG,
        SV,
        GQ,
        ER,
        EE,
        ET,
        FK,
        FO,
        FJ,
        FI,
        FR,
        GF,
        PF,
        TF,
        GA,
        GM,
        GE,
        DE,
        GH,
        GI,
        GR,
        GL,
        GD,
        GP,
        GU,
        GT,
        GG,
        GN,
        GW,
        GY,
        HT,
        HM,
        VA,
        HN,
        HK,
        HU,
        IS,
        IN,
        ID,
        IR,
        IQ,
        IE,
        IM,
        IL,
        IT,
        JM,
        JP,
        JE,
        JO,
        KZ,
        KE,
        KI,
        KP,
        KR,
        KW,
        KG,
        LA,
        LV,
        LB,
        LS,
        LR,
        LY,
        LI,
        LT,
        LU,
        MO,
        MK,
        MG,
        MW,
        MY,
        MV,
        ML,
        MT,
        MH,
        MQ,
        MR,
        MU,
        YT,
        MX,
        FM,
        MD,
        MC,
        MN,
        ME,
        MS,
        MA,
        MZ,
        MM,
        NA,
        NR,
        NP,
        NL,
        NC,
        NZ,
        NI,
        NE,
        NG,
        NU,
        NF,
        MP,
        NO,
        OM,
        PK,
        PW,
        PS,
        PA,
        PG,
        PY,
        PE,
        PH,
        PN,
        PL,
        PT,
        PR,
        QA,
        RE,
        RO,
        RU,
        RW,
        BL,
        SH,
        KN,
        LC,
        MF,
        PM,
        VC,
        WS,
        SM,
        ST,
        SA,
        SN,
        RS,
        SC,
        SL,
        SG,
        SX,
        SK,
        SI,
        SB,
        SO,
        ZA,
        GS,
        SS,
        ES,
        LK,
        SD,
        SR,
        SJ,
        SZ,
        SE,
        CH,
        SY,
        TW,
        TJ,
        TZ,
        TH,
        TL,
        TG,
        TK,
        TO,
        TT,
        TN,
        TR,
        TM,
        TC,
        TV,
        UG,
        UA,
        AE,
        GB,
        US,
        UM,
        UY,
        UZ,
        VU,
        VE,
        VN,
        VG,
        VI,
        WF,
        EH,
        YE,
        ZM,
        ZW
        `, {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "spott.p.rapidapi.com",
                "x-rapidapi-key": "2b140728d4msh9fed995ffd67651p16455cjsnd6c6d9e20a66",
            }
        });

        const data = await response.json()
        if (data.length < 1) {
            return console.log('not found')
        }
        console.log('place', data[0].name)

        setLocation(data[0].name)
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
            const response = await fetch(`https://trueway-places.p.rapidapi.com/FindPlacesNearby?type=hospital&radius=${radius}&language=en&location=${lat},${lng}`, {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
                    "x-rapidapi-key": "2b140728d4msh9fed995ffd67651p16455cjsnd6c6d9e20a66",
                }
            })
            const data = await response.json();
            console.log('results', data)
            if (!data.results) {
                return console.log('not found')
            }
            return data;
        }
        catch (e) {
            console.error(e)
        }

    }

    return (
        <div style={{ marginTop: '3em' }}>
            <div className={classes.flex}>
                <TextField
                    id="outlined-number"
                    defaultValue='12'
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.root}
                    variant="outlined"
                    onChange={e => {
                        setRadius(e.target.value);
                        console.log(e.target.value)
                    }}
                />
                <Paper component="form" className={classes.root}>

                    <InputBase
                        className={classes.input}
                        placeholder="Search Hospitals By Location"
                        onChange={e => {
                            setSearchKey(e.target.value)
                            handlePlace();
                        }}
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={e => {
                        e.preventDefault();
                        handleLocation();
                        handleSearch();
                    }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
            <div>
                <p>Hospitals are represented with the <AddCircleOutlineRoundedIcon color="secondary" /> icon on the map </p>
            </div>
            <div >
                <Map style={{ height: '35em', width: '100%' }} center={[lat, lng]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* {positionA.map(pos => (
            <Marker position={[pos, pos]} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        ))} */}
                </Map>
            </div>
        </div>
    )
}

export default Maps;