<template>
    <div class="MapComponent"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

export default {
    name: 'MapComponent',
    props: ['mainLocation', 'selectedLocationId', 'secondaryLocations'],
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
            }
            this.fitMap();
        },
        selectedLocationId: function (value) {
            if (this.google && this.map && value) {
                if (this.previousSelectedId) {
                    const marker = this.markers.get(this.previousSelectedId);
                    if (marker) {
                        marker.setLabel('');
                        marker.setOpacity(0.5);
                    }
                }

                this.selectedLocationId = value;
                this.previousSelectedId = value;

                this.renderSelectedMarker();
            }
        },
        secondaryLocations: function (value) {
            console.log(`settingSecondaryLocations to ${JSON.stringify(value)} ${typeof value}`);
            this.secondaryLocations = value;

            if (this.google && this.map && value) {
                this.renderSecondaryMarkers();
            }
        },
    },
    data() {
        return {
            map: null,
            google: null,
            markers: new Map(),
            mainMarker: null,
            previousSelectedId: null,
        };
    },
    async mounted() {
        try {
            this.google = await gmapsInit();

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

            if (this.selectedLocationId) {
                this.previousSelectedId = this.selectedLocationId;
            }

            this.renderSecondaryMarkers();
            this.renderSelectedMarker();

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        renderSecondaryMarkers() {
            if (this.secondaryLocations) {
                this.markers = new Map();
                this.secondaryLocations.forEach((value, key) => {
                    const marker = new this.google.maps.Marker({position: value, map: this.map, opacity: 0.5});
                    this.markers.set(key, marker);
                });
            }
        },
        renderSelectedMarker() {
            if (this.selectedLocationId) {
                const selectedMarker = this.markers.get(this.selectedLocationId);
                if (selectedMarker) {
                    selectedMarker.setLabel('Selected');
                    selectedMarker.setOpacity(1);
                }
            }
            this.fitMap();
        },
        fitMap() {
            if (this.google && this.secondaryLocations) {
                const selectedLocation = this.secondaryLocations.get(this.selectedLocationId);
                if (this.mainLocation && selectedLocation) {
                    const bounds = new this.google.maps.LatLngBounds()
                        .extend(this.mainLocation)
                        .extend(selectedLocation);

                    this.map.fitBounds(bounds);
                }
            }
        }
    }
};
</script>

<style>
    .MapComponent {
        width: 100%;
        height: 100%;
    }
</style>
