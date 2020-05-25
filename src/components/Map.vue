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
            this.selectedLocation = value;
            if (this.google && this.map && value) {
                new this.google.maps.Marker({position: value, map: this.map, label: 'Selected'});

                if (this.mainLocation) {
                    const bounds = new this.google.maps.LatLngBounds()
                        .extend(this.mainLocation)
                        .extend(value);

                    this.map.fitBounds(bounds);
                }
            }
        },
        secondaryLocations: function (value) {
            this.secondaryLocations = value;
            if (this.google && this.map && value) {
                value.map(
                    x => new this.google.maps.Marker({position: x, map: this.map, opacity: 0.5})
                );
            }
        },
    },
    data() {
        return {
            map: null,
            google: null,
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
                new this.google.maps.Marker({position: this.mainLocation, map: this.map, label: 'You'});
            }

            if (this.selectedLocation) {
                new this.google.maps.Marker({position: this.selectedLocation, map: this.map, label: 'Selected'});
            }

            if (this.mainLocation && this.selectedLocation) {
                const bounds = new this.google.maps.LatLngBounds()
                    .extend(this.mainLocation)
                    .extend(this.selectedLocation);

                this.map.fitBounds(bounds);
            }

            if (this.secondaryLocations) {
                this.secondaryLocations.map(
                    x => new this.google.maps.Marker({position: x, map: this.map, opacity: 0.5})
                );
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
