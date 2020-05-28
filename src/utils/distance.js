export default function distance(location1, location2) {
    const { lat: lat1, lng: lon1 } = location1;
    const { lat: lat2, lng: lon2 } = location2;
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        const radlat1 = Math.PI * lat1/180.0;
        const radlat2 = Math.PI * lat2/180.0;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta/180.0;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        return Math.acos(dist) * (180.0 / Math.PI) * 60 * 1.1515 * 1.609344;
    }
}
