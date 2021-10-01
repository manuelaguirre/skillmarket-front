<template>
    <div class="MapComponent"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

// TODO: fix this component using VUEX
export default {
    name: 'MapComponent',
    props: ['mainLocation', 'selectedLocationId', 'secondaryLocations', 'shouldReprocessSecondaryLocations'],
    computed: {
        center: function() {
            return this.mainLocation ? this.mainLocation : {lat:0, lng:0};
        },
    },
    watch: {
        mainLocation: function(value) {
            this.$log.debug('MapComponent',`main location changed = ${JSON.stringify(value)}`);
            if (this.google && this.map && value) {
                this.$log.debug('MapComponent','creating main location marker');
                new this.google.maps.Marker({position: value, map: this.map, label: 'You'});
            }
            this.fitMap();
        },
        selectedLocationId: function (value, oldValue) {
            this.$log.debug('MapComponent',`selected location id changed = ${JSON.stringify(value)}`);
            if (this.google && this.map && value) {
                if (oldValue) {
                    this.$log.debug('MapComponent','unselecting previous selected marker');
                    const marker = this.markers.get(oldValue);
                    if (marker) {
                        marker.setLabel('');
                        marker.setOpacity(0.5);
                    }
                }

                this.renderSelectedMarker();
            }
        },
        // TODO: I suspect this could be implemented using VUEX without need for this flag.
        shouldReprocessSecondaryLocations : function(value) {
            this.$log.debug('MapComponent',`settingSecondaryLocations to ${JSON.stringify(value)} ${typeof value}`);

            if (this.google && this.map) {
                this.$log.debug('MapComponent','calling secondary markers render');
                this.renderSecondaryMarkers();
                this.renderSelectedMarker();
            }
        },
    },
    data() {
        return {
            map: null,
            google: null,
            markers: new Map(),
            mainMarker: null,
        };
    },
    async mounted() {
        this.$log.debug('MapComponent','mounted()');
        try {
            this.google = await gmapsInit();

            this.map = new this.google.maps.Map(this.$el, {
                center: this.center,
                zoom: 12,
            });

            if (this.mainLocation) {
                this.$log.debug('MapComponent',`main location exists ${JSON.stringify(this.mainLocation)}`);
                if (this.mainMarker) {
                    this.$log.debug('MapComponent',`main marker exists ${JSON.stringify(this.mainMarker)}`);
                    this.mainMarker.setPosition(this.mainLocation);
                } else {
                    this.$log.debug('MapComponent','creating main marker');
                    this.mainMarker = new this.google.maps.Marker({position: this.mainLocation, map: this.map, label: 'You'});
                }
            }

            if (this.selectedLocationId) {
                this.$log.debug('MapComponent',`selected location exists ${JSON.stringify(this.selectedLocationId)}`);
            }

            this.renderSecondaryMarkers();
            this.renderSelectedMarker();

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        renderSecondaryMarkers() {
            this.$log.debug('MapComponent','renderSecondaryMarkers()');
            this.$log.debug('MapComponent',`secondaryLocations = ${JSON.stringify(this.secondaryLocations)}`);
            if (this.secondaryLocations) {
                this.$log.debug('MapComponent','creating secondary markers');
                this.markers = new Map();
                this.secondaryLocations.forEach((value, key) => {
                    this.$log.debug('MapComponent',`creating marker ${key}`);
                    const marker = new this.google.maps.Marker({position: value, map: this.map, opacity: 0.5});
                    this.markers.set(key, marker);
                });
            }
        },
        renderSelectedMarker() {
            this.$log.debug('MapComponent','renderSelectedMarker()');
            this.$log.debug('MapComponent',`selectedLocationId = ${this.selectedLocationId}`);
            if (this.selectedLocationId) {
                this.$log.debug('MapComponent','selecting new marker');
                const selectedMarker = this.markers.get(this.selectedLocationId);
                if (selectedMarker) {
                    this.$log.debug('MapComponent','modifying selected marker');
                    selectedMarker.setLabel('Selected');
                    selectedMarker.setOpacity(1);
                }
            }
            this.fitMap();
        },
        fitMap() {
            this.$log.debug('MapComponent','fitMap()');
            if (this.google && this.secondaryLocations) {
                const selectedLocation = this.secondaryLocations.get(this.selectedLocationId);
                this.$log.debug('MapComponent',`getting selected location to fit map = ${JSON.stringify(selectedLocation)}`);
                if (this.mainLocation && selectedLocation) {
                    this.$log.debug('MapComponent','actually fitting map');
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
