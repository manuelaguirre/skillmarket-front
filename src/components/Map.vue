<template>
    <div class="Map"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

export default {
    name: 'Map',
    props: ['mainLocation', 'selectedLocation', 'secondaryLocations'],
    computed: {
        center: function() {
            return this.mainLocation ? this.mainLocation : {lat:0, lng:0};
        },
    },
    watch: {
        mainLocation: function(value) {
            this.mainLocation = value;
            if (this.google && this.map && value) {
                new this.google.maps.Marker({position: value, map: this.map, label: 'You'});

                if (this.selectedLocation) {
                    const bounds = new this.google.maps.LatLngBounds()
                        .extend(value)
                        .extend(this.selectedLocation);

                    this.map.fitBounds(bounds);
                }
            }
        },
        selectedLocation: function (value) {
            console.log(`setting selectedLocation to ${JSON.stringify(value)} from ${JSON.stringify(this.selectedLocation)}`);
            console.log(`mainLocation = ${JSON.stringify(this.mainLocation)}`);
            console.log(`selectedMarker = ${JSON.stringify(this.selectedMarker)}`);
            // console.log(`markers = ${JSON.stringify(this.markers)}`);
            this.selectedLocation = value;
            if (this.google && this.map && value) {
                if (this.selectedMarker) {
                    console.log('resetting selected marker');
                    this.selectedMarker.setLabel('');
                    this.selectedMarker.setOpacity(0.5);
                }
                this.selectedMarker = this.markers.get(JSON.stringify(value));
                if (this.selectedMarker) {
                    console.log('selecting existing marker');
                    this.selectedMarker.setLabel('Selected');
                    this.selectedMarker.setOpacity(1);
                } else {
                    console.log('creating new selected marker');
                    this.selectedMarker = new this.google.maps.Marker({position: value, map: this.map, label: 'Selected'});
                    this.markers.set(JSON.stringify(value), this.selectedMarker);
                }

                // new this.google.maps.Marker({position: value, map: this.map, label: 'Selected'});

                if (this.mainLocation) {
                    const bounds = new this.google.maps.LatLngBounds()
                        .extend(this.mainLocation)
                        .extend(value);

                    this.map.fitBounds(bounds);
                }
            }
        },
        secondaryLocations: function (value) {
            console.log(`settingSecondaryLocations to ${JSON.stringify(value)} ${typeof value}`);
            this.secondaryLocations = value;
            if (this.google && this.map && value) {
                this.markers = new Map();
                for (const x of value) {
                    console.log(`x is ${JSON.stringify(x)}`);
                    this.markers.set(JSON.stringify(x), new this.google.maps.Marker({position: x, map: this.map, opacity: 0.5}));
                }
            }
        },
    },
    data() {
        return {
            map: null,
            google: null,
            markers: new Map(),
            selectedMarker: null,
            mainMarker: null,
        };
    },
    updated() {
        console.log('updated');
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    async mounted() {
        console.log('mounting');
        try {
            console.log('mounting try');
            this.google = await gmapsInit();
            console.log('after gmapsInit');

            console.log(`mainLocation = ${JSON.stringify(this.mainLocation)}`);
            console.log(`selectedLocation = ${JSON.stringify(this.selectedLocation)}`);
            console.log(`secondaryLocations = ${JSON.stringify(this.secondaryLocations)}`);

            this.map = new this.google.maps.Map(this.$el, {
                center: this.center,
                zoom: 12
            });

            if (this.mainLocation) {
                if (this.mainMarker) {
                    this.mainMarker.setPosition(this.mainLocation);
                } else {
                    this.mainMarker = new this.google.maps.Marker({position: this.mainLocation, map: this.map, label: 'You'});
                }
            }

            if (this.secondaryLocations) {
                for (const x of this.secondaryLocations) {
                    this.markers = new Map();
                    this.markers.set(JSON.stringify(x), new this.google.maps.Marker({position: x, map: this.map, opacity: 0.5}));
                }
            }

            if (this.selectedLocation) {
                if (this.selectedMarker) {
                    this.selectedMarker.setLabel('');
                    this.selectedMarker.setOpacity(0.5);
                }
                this.selectedMarker = this.markers.get(JSON.stringify(this.selectedLocation));
                if (this.selectedMarker) {
                    this.selectedMarker.setLabel('Selected');
                    this.selectedMarker.setOpacity(1);
                } else {
                    this.selectedMarker = new this.google.maps.Marker({position: this.selectedLocation, map: this.map, label: 'Selected'});
                    this.markers.set(JSON.stringify(this.selectedLocation), this.selectedMarker);
                }
            }

            if (this.mainLocation && this.selectedLocation) {
                const bounds = new this.google.maps.LatLngBounds()
                    .extend(this.mainLocation)
                    .extend(this.selectedLocation);

                this.map.fitBounds(bounds);
            }


        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style>
    .Map {
        width: 100%;
        height: 100%;
    }
</style>
